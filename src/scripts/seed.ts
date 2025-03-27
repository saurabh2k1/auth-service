import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
dotenv.config();


const seedSuperAdmin = async () => {
    try {
        await AppDataSource.initialize();
        const userRepository = AppDataSource.getRepository(User);
        
        // Check if a Super Admin already exist
        const existingUser = await userRepository.findOne({ where: { role: 'superadmin' } });
        if (existingUser) {
            console.log('Super Admin already exists. Skipping seeding.');
            await AppDataSource.destroy();
            return;
        }

        // create a new Super Admin user
        const passwordHash = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD || 'SuperSecure123!', 10);
        const superAdmin = userRepository.create({
            username: process.env.SUPER_ADMIN_USERNAME || 'superadmin',
            passwordHash,
            role: 'superadmin',
        });

        await userRepository.save(superAdmin);
        console.log('Super Admin seeded successfully.');
        await AppDataSource.destroy();
    } catch (error) {
        console.error('Error seeding Super Admin:', error);
    }
};

//Execute the function
seedSuperAdmin();
      
