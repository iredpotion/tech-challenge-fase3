import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    usuario: { type: String, required: true },
    texto: { type: String, required: true },
    data: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const postSchema = new mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        titulo: {type: String, required: [true, "O título do post é obrigatório"]},
        descricao : {type: String, required: [true, "A descrição do post é obrigatório"]},
        autor: {type: String , required: [true, "O autor do post é obrigatório"] },        
        postAtivo: {type: Boolean, default: true, required: [true, "O status do post é obrigatório"]},
        comentarios: [comentarioSchema],
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'dataCriacao', updatedAt: 'dataAtualizacao' }
    }
);


const post = mongoose.model("posts", postSchema);

export {post, postSchema};