const crypto = require('crypto');
const { Verification, MRVJob } = require('../models');
const fs = require('fs');

// Load verifier's private key (for demo, use file or env as before)
const privateKey = fs.readFileSync('private.pem', 'utf8');

exports.verifyMRVJob = async (req, res) => {
  try {
    const { job_id, verifier_id, approval, comments } = req.body;

    // Find the MRV job to verify
    const mrvJob = await MRVJob.findOne({ where: { job_id } });
    if (!mrvJob) return res.status(404).json({ error: 'MRV job not found' });

    // Prepare message for signature (could be job_id + approval + comments)
    const message = JSON.stringify({ job_id, approval, comments });

    // Sign the verification
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    sign.end();
    const verifier_signature = sign.sign(privateKey, 'hex');

    // Store verification record
    const verification = await Verification.create({
      verification_id: crypto.randomBytes(16).toString('hex'),
      job_id,
      verifier_id,
      approval,
      verifier_signature,
      comments,
      created_at: new Date()
    });

    // Optionally, update MRV job status
    await MRVJob.update(
      { status: approval ? 'verified' : 'rejected' },
      { where: { job_id } }
    );

    res.status(201).json({
      message: 'Verification recorded',
      verification_id: verification.verification_id,
      verifier_signature
    });
  } catch (err) {
    res.status(400).json({ error: 'Verification failed', details: err.message });
  }
};