'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "../utils"
import { useState } from "react"

export const RegisterForm = ({className, ...props}: React.ComponentPropsWithoutRef<"div">) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e:any) => {
        e.preventDefault();
        if (!email || !password || !firstname || !lastname) {
            setError('Please enter email and password');
            return;
        }
        const res = await registerUser(email,password,firstname,lastname);
        if(!res.success){
            setError(res?.error || 'Nie udało się zarejestrować użytkownika');
        }
        
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to register to your account and post your car for sale
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Hasło</Label>
                </div>
                <Input id="password" type="password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Imie</Label>
                </div>
                <Input id="password" type="password" required name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Nazwisko</Label>
                </div>
                <Input id="password" type="password" required name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>  
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Have an account?{" "}
              <a href="/auth/login" className="underline underline-offset-4">
                Zaloguj się
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    )
}

export default RegisterForm;