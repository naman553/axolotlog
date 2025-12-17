import Blog from "../../models/blogs/blogs.js";
import User from "../../models/users/Users.js";

export const createBlog = async (req,res)=>{
    try{
        const {title,content} = req.body
        const UserId= req.user.id

         if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const blog = await Blog.create({
        title,content,
        author: UserId

        
    })

    await User.findOneAndUpdate(UserId, {$push: { blogs: blog._id }})

    res.status(201).json({message:"Blog created successfully", blog})

    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}

export const getAllBlogs = async (req,res)=>{
   try {
     const blogs = await Blog.find()
       .populate('author', 'name email') // populate author name & email
       .sort({ createdAt: -1 })          // newest first
 
     res.status(200).json(blogs)
   

}catch(error){
    res.status(500).json({message:"server error"})
}
}

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email')

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const userId = req.user.id

    // 1️⃣ Find the blog first to check author
    const blog = await Blog.findById(id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    // 2️⃣ Author check
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    // 3️⃣ Update the blog using findByIdAndUpdate
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title: title || blog.title, content: content || blog.content },
      { new: true, runValidators: true } // return updated doc and run schema validators
    )

    res.status(200).json({ message: 'Blog updated', blog: updatedBlog })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // 1️⃣ Find the blog first
    const blog = await Blog.findById(id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    // 2️⃣ Check if logged-in user is the author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    // 3️⃣ Delete the blog
    await blog.remove()

    res.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}