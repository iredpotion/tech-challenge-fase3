import { usuario } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  /**
   * @swagger
   * /auth/registrar:
   *   post:
   *     summary: Registra um novo usuário
   *     tags:
   *       - Autenticação
   *     description: Cria uma nova conta de usuário no sistema.
   */
  static async registrar(req, res, next) {
    try {
      const { nome, email, senha, cargo } = req.body;

      if (!nome || !email || !senha || !cargo) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatórios." });
      }

      const usuarioExistente = await usuario.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: "E-mail já cadastrado." });
      }

      // 🔤 Normaliza o cargo para minúsculo
      const cargoNormalizado = cargo.toLowerCase();

      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = await usuario.create({
        nome,
        email,
        senha: senhaHash,
        cargo: cargoNormalizado,
      });

      res.status(201).json({
        mensagem: "Usuário criado com sucesso!",
        usuario: novoUsuario,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Realiza login
   *     tags:
   *       - Autenticação
   *     description: Retorna um token JWT se as credenciais forem válidas.
   */
  static async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      const usuarioEncontrado = await usuario
        .findOne({ email })
        .select("+cargo");
      if (!usuarioEncontrado) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);
      if (!senhaValida) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      // 🔤 Garante que o cargo no token também esteja minúsculo
      const cargoNormalizado = usuarioEncontrado.cargo.toLowerCase();

      const token = jwt.sign(
        {
          id: usuarioEncontrado._id,
          email: usuarioEncontrado.email,
          cargo: cargoNormalizado,
        },
        process.env.JWT_SECRET || "segredo",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        mensagem: "Login realizado com sucesso",
        token,
        nome: usuarioEncontrado.nome,
        cargo: cargoNormalizado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
