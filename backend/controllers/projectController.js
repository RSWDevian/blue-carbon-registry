const crypto = require('crypto');
const { Project } = require('../models');

exports.createProject = async (req, res) => {
  try {
    const { owner_id, project_name, description, polygon, tenure_docs, method_id } = req.body;

    // Concatenate input parameters to form a unique string
    const inputString = `${owner_id}|${project_name}|${description}|${JSON.stringify(polygon)}|${tenure_docs?.join(',')}|${method_id}`;
    // Generate SHA-256 hash
    const project_id = crypto.createHash('sha256').update(inputString).digest('hex');

    const project = await Project.create({
      project_id,
      owner_id,
      project_name,
      description,
      polygon,
      tenure_docs,
      method_id,
      status: 'registered'
    });

    res.status(201).json({ project_id, message: 'Project created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Project creation failed', details: err.message });
  }
};