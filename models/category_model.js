const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: [true, "Category ID is required"],
    trim: true, // Trim spaces
    unique: true, // Ensure uniqueness
  },
  color: {
    type: String,
    required: [true, "Color is required"],
    trim: true, // Trim spaces
    validate: {
      validator: function (v) {
        // Regex to validate hex color code (either 3 or 6 characters after #)
        return /^#([0-9A-Fa-f]{3}){1,2}$/.test(v);
      },
      message: "Invalid color format. It must be a valid hexadecimal color code.",
    },
  },
  category_name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true, // Trim spaces
    minlength: [3, "Category name must be at least 3 characters long"], // Minimum length validation
    maxlength: [100, "Category name must be less than 100 characters"], // Maximum length validation
  },
  category_des: {
    type: String,
    required: [true, "Category description is required"],
    trim: true, // Trim spaces
    minlength: [10, "Category description must be at least 10 characters long"], // Minimum length validation
  },
  category_image: {
    type: String,
    required: [true, "Category banner image URL is required"],
    validate: {
      validator: function (v) {
        // Basic URL format validation
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(v);
      },
      message: "Invalid URL format for category image",
    },
  },
  category_banner_image: {
    type: String,
    required: [true, "Category image URL is required"],
    validate: {
      validator: function (v) {
        // Basic URL format validation
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(v);
      },
      message: "Invalid URL format for category image",
    },
  },
  visibility: {
    type: Boolean,
    required: [true, "Category visibility is required"],
  },
  created_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    required: [true, "Is deleted status is required"],
    default: false,
  },
  is_landingPage: {
    type: Boolean,
    default: false,
  },
  selected_sub_category_ref: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

// Create and export the Category model
module.exports = mongoose.model("Category", categorySchema);
