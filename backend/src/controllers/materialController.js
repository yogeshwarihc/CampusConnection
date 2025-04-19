const Material = require('../models/Materials');

exports.uploadMaterial = async (req, res) => {
  try {
    const { title, description, author, semester, subject } = req.body;
    const file = req.file;

    const material = new Material({
      title,
      description,
      author,
      date: new Date(),
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      semester,
      subject,
      fileUrl: `/uploads/${req.file.filename}`,
      
      
    });
    console.log("Material File URL:", material.fileUrl);

    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ date: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
