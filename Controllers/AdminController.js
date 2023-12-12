
const Admin=require("../Models/Admin");
const User=require("../Models/User");
const BlogPost=require("../Models/BlogPost");
exports.AddLogin=async (req, res) => {
    try {
      const { emailId, name, password } = req.body;
  
      // Validate request data (you might want to add more validation)
      if (!emailId || !name || !password) {
        return res.status(400).json({ error: 'Incomplete data provided' });
      }
  
      // Check if admin with the same emailId already exists
      const existingAdmin = await Admin.findOne({ emailId });
      if (existingAdmin) {
        return res.status(409).json({ error: 'Admin with this email already exists' });
      }
  
      // Create a new admin
      const newAdmin = new Admin({
        emailId,
        name,
        password,
      });
  
      // Save the admin to the database
      await newAdmin.save();
  
      res.status(200).json({ message: 'Admin added successfully' });
    } catch (error) {
      console.error('Error adding admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.GetAdmin = async (req, res) => {
    try {
      // Fetch all admins from the database
      const admins = await Admin.find();
  
      if (admins.length === 0) {
        return res.status(404).json({ error: 'No admins found' });
      }
  
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.DeleteAdmin = async (req, res) => {
    try {
      const adminId = req.body.adminId;
        console.log(adminId)
      // Check if admin with the given ID exists
      const existingAdmin = await Admin.findById(adminId);
      if (!existingAdmin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Delete the admin
      await Admin.findByIdAndDelete(adminId);
  
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      console.error("Error deleting admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



exports.GetUsers=async (req, res) => {
    try {
      const users = await User.find({});
  
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  exports.DeleteUser=async (req, res) => {
    try {
      const userId = req.body.userId;
  
      // Check if user with the given ID exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user's blog posts
      await BlogPost.deleteMany({ userId });
  
      // Delete the user
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: 'User and their posts deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.DeletePost=async (req, res) => {
    try {
        const postId = req.body.postId;

        // Check if the blog post exists
        const existingPost = await BlogPost.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Get the post title for the notification
        const postTitle = existingPost.title;

        // Delete the blog post
        await BlogPost.findByIdAndDelete(postId);

        // Remove the post reference from users' profiles
        await User.updateMany(
            { $pull: { posts: postId } },
            { multi: true }
        );

        // Add a notification to users who had the post
        await User.updateMany(
            { posts: postId },
            {
                $push: {
                    notifications: {
                        message: `Your post "${postTitle}" has been deleted.`,
                        date: new Date(),
                    },
                },
            },
            { multi: true }
        );

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.AdminLogin=async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Find admin by email
      const admin = await Admin.findOne({ emailId:email });
      console.log(admin)
      if (!admin) {
        
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare passwords
      const isPasswordMatch = admin.password==password;
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Admin authenticated
      res.status(200).json({ message: 'Admin logged in successfully',name:admin.name });
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }