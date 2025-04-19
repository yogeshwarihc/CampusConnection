const Paper = require('../models/Paper');

exports.uploadPaper = async (req, res) => {
  try {
    const { subject, semester, year, examType, uploadedBy } = req.body;
    const file = req.file;

    const paper = new Paper({
      subject,
      semester,
      year,
      examType,
      date: new Date(),
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploadedBy,
      subject,
      fileUrl: `/uploads/${req.file.filename}`,
      
      
    });
    console.log("Paper File URL:", paper.fileUrl);

    await paper.save();
    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaper = async (req, res) => {
  try {
    const papers = await Paper.find().sort({ date: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
