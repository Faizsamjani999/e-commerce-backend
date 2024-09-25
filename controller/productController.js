const Product = require("../model/Product")

const addProduct = async(req,res)=>{
    const productData = {
        pname : req.body.pname,
        brandname : req.body.brandname,
        des : req.body.des,
        price : req.body.price,
        img : req.body.img
    }

    try{
       const data = await Product.create(productData)

       res.status(201).json(data);
       console.log(data);
       
    }catch(err){
        res.status(400).json({message:"Try Again"})
    }

}

const GetProduct = async(req,res)=>{
    try{
        const data = await Product.find()
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({message:"Some Error To Fetch Data"});
    }
}

const deletedProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        console.log("id",id);
        

        const data = await Product.findByIdAndDelete(id)

        res.status(200).json(data);
        console.log("data is -",data);
        

    }catch(err){
        res.status(400).json({message:"Some Error To Delete Data"});
    }
}

const updateData = async(req,res)=>{
    try{
        const id = req.params.id;

        const newData = {
            pname : req.body.pname,
            brandname : req.body.brandname,
            des : req.body.des,
            price : req.body.price,
            img : req.body.img
        }

        const data = await Product.findByIdAndUpdate(id,newData)

        res.status(200).json({message:"Product Updated Successfully...",key:data})
    }catch(err){
        res.status(400).json({message:"Some Error To Update Data"});
    }
}

const singleProduct = async(req,res)=>{
    const {id} = req.params;
    // console.log(id);
    
    try{
        const ProductSingle = await Product.findById(id);

        if(!ProductSingle)
        {
            return res.status(404).json({message:"This Product Not Found..."})
        }
        res.json(ProductSingle);
        console.log(ProductSingle);
        
    }catch(err){
        res.status(500).json({message:"Server Error..."})
    }
}

module.exports = {
    addProduct,
    GetProduct,
    deletedProduct,
    updateData,
    singleProduct
}