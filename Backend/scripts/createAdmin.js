import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration. Please set up Supabase connection first.');
      console.log('Click the "Connect to Supabase" button in the top right to set up Supabase.');
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('Connected to Supabase');

    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@example.com')
      .single();

    if (existingAdmin && !checkError) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error creating admin user:', error);
      process.exit(1);
    }

    console.log('Admin user created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();