import { UserModel } from "../models/usuario.model.js";

export const UpdateUser = async (req, res) => {
  const id = req.user.id;
  try {
    const [Update] = await UserModel.update(req.body, {
      where: { id },
    });
    if (Update) {
      const updateuser = await UserModel.findByPk(id);
      res.status(200).json(updateuser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
