import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name, email, admin} : IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories);

        if(!email) {
            throw new Error("Email incorrect");
        }

        const userAlredyExists = await usersRepository.findOne({
            email,
        });

        if(userAlredyExists) {
            throw new Error("User alredy exists!")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        });

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUserService};