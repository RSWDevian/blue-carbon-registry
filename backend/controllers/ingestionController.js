const crypto = require('crypto');
const { FieldBundle, Project } = require('../models');
const mrvController = require('./mrvController');
const fs=require('fs');

exports.uploadFieldBundle = async (req, res) => {
  try {
    const {
      project_id,
      submitted_by,
      plots,
      soil_entries,
      photos,
      drone_metadata
    } = req.body;

    // Generate unique bundle_id
    const bundle_id = crypto.randomBytes(16).toString('hex');

    // Concatenate and stringify input parameters for signing
    const message = JSON.stringify({
      bundle_id,
      project_id,
      submitted_by,
      plots,
      soil_entries,
      photos,
      drone_metadata
    });

    const privateKey = fs.readFileSync('private.pem', 'utf8');

    // Sign the message
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');

    // 1. Insert into field_bundles
    const fieldBundle = await FieldBundle.create({
      bundle_id,
      project_id,
      submitted_by,
      plots,
      soil_entries,
      photos,
      drone_metadata,
      signature
    });

    // 2. Update project status to "data_uploaded"
    await Project.update(
      { status: 'data_uploaded' },
      { where: { project_id } }
    );

    // 3. Call MRV engine and create MRV job
    const mrvResult = await mrvController.runMRVEngineAuto(project_id, fieldBundle);

    res.status(201).json({
      message: 'Field bundle uploaded, project status updated, MRV job started.',
      bundle_id,
      signature,
      fieldBundle,
      mrvResult
    });
  } catch (err) {
    res.status(400).json({ error: 'Ingestion failed', details: err.message });
  }
};