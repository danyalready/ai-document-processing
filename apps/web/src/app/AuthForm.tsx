import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface FormData {
    fullname?: string;
    email: string;
    password: string;
}

interface Props {
    isLogin: boolean;
    formData: FormData;
    handleSubmit: () => void;
}

export default function AuthForm(props: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate authentication
        setTimeout(() => {
            // onLogin();
        }, 800);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {!props.isLogin && (
                <div>
                    <label className="block text-sm font-mono text-foreground mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={props.formData.fullname}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            required={!props.isLogin}
                        />
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-mono text-foreground mb-2">
                    Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-mono text-foreground">
                        Password
                    </label>
                    {props.isLogin && (
                        <button
                            type="button"
                            className="text-xs font-mono text-primary hover:text-primary/80"
                        >
                            Forgot password?
                        </button>
                    )}
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                </div>
                {!props.isLogin && (
                    <p className="text-xs font-mono text-muted-foreground mt-2">
                        Must be at least 8 characters with a mix of letters and
                        numbers
                    </p>
                )}
            </div>

            {!props.isLogin && (
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-4 h-4 rounded border-border bg-secondary"
                        required
                    />
                    <label
                        htmlFor="terms"
                        className="text-xs font-mono text-muted-foreground"
                    >
                        I agree to the{" "}
                        <button
                            type="button"
                            className="text-primary hover:text-primary/80"
                        >
                            Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                            type="button"
                            className="text-primary hover:text-primary/80"
                        >
                            Privacy Policy
                        </button>
                    </label>
                </div>
            )}

            <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-mono font-medium hover:bg-primary/90 transition-colors"
            >
                {props.isLogin ? "Sign In" : "Create Account"}
            </button>
        </form>
    );
}
