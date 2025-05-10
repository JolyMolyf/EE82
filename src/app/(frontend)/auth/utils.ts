import payload from 'payload';
import { cookies } from 'next/headers';

interface LoginCredentials {
  email: string;
  password: string;
}

export async function registerUser(email:string, password:string, firstName:string, lastName:string) {
  try {
    if (!email || !password || !firstName || !lastName) {
      throw new Error('Email and password are required');
    }

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password, firstName, lastName
      }),
    });

    return { success: response.ok, message: 'User registered successfully' };
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Nie udało się zarejestrować użytkownika',
    };
  } 
}

export async function loginUser(email:string, password:string) {
  try {
    // Attempt to login
    console.log(email, password);
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during login',
    }
  }
}

export async function getUser() {
  const response = await fetch('http://localhost:3000/api/users/me', {
    credentials: 'include',
  });
  const data = await response.json();
  console.log(data);
}

export async function logoutUser() {
  const response = await fetch('http://localhost:3000/api/users/logout', {
    credentials: 'include',
  });
  const data = await response.json();
  console.log(data);
}
