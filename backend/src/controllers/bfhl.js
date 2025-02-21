export const getOperationCode = (req, res) => {
  res.json({ operation_code: 1 });
};

export const processArray = (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array"
      });
    }

    // Process the array
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && /^[A-Za-z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 
      ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)]
      : [];

    res.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
};