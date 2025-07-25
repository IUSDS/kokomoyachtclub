import React, { useState, useRef, useEffect } from "react";
import { Check, X, Mail, Anchor } from "lucide-react";

const ForgotPassword = () => {
  // pick your API base from env (Vite / CRA)
  const API_BASE = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://api.kokomoyachtclub.vip";

  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [failMsg, setFailMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef(null);

  const TIMER_KEY = 'passwordResetTimer';
  const blockDuration = 60;

  // Check for existing timer on component mount
  useEffect(() => {
    const savedTimer = localStorage.getItem(TIMER_KEY);
    if (savedTimer) {
      try {
        const { email: savedEmail, timestamp } = JSON.parse(savedTimer);
        const elapsed = Date.now() - timestamp;
        const remaining = 60000 - elapsed; // 60 seconds in milliseconds
        
        if (remaining > 0) {
          setEmail(savedEmail);
          startCountdown(remaining);
        } else {
          // Timer expired, clean up
          localStorage.removeItem(TIMER_KEY);
        }
      } catch (error) {
        // Invalid localStorage data, clean up
        localStorage.removeItem(TIMER_KEY);
      }
    }
  }, []);

  const startCountdown = (duration) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsButtonDisabled(true);
    setCountdown(Math.ceil(duration / 1000));

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsButtonDisabled(false);
          localStorage.removeItem(TIMER_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const showSuccess = (message) => {
    setFailMsg(false);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 10000);
  };

  const showError = (message) => {
    setSuccessMsg(false);
    setErrorMessage(message);
    setFailMsg(true);
    setTimeout(() => {
      setFailMsg(false);
      setErrorMessage("");
    }, 13000);
  };

  const handleResetReq = async () => {
    if (isButtonDisabled || !email.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/forgot/forgot-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email: email }).toString(),
      });

      const data = await response.json();

      // Handle different response scenarios
      if (response.ok) {
        // Success case
        if (data.start_timer) {
          // Save timer info to localStorage
          localStorage.setItem(TIMER_KEY, JSON.stringify({
            email: email,
            timestamp: Date.now()
          }));
          
          startCountdown(data.remaining_time || 60000);
        }
        
        showSuccess(data.message || "Reset link sent successfully!");
        
      } else {
        // Error cases (400, 429, etc.)
        const errorDetail = data.detail || data;
        
        if (errorDetail.start_timer) {
          // Rate limiting case - start timer even though it's an error
          localStorage.setItem(TIMER_KEY, JSON.stringify({
            email: email,
            timestamp: Date.now()
          }));
          
          startCountdown(errorDetail.remaining_time || 60000);
        }
        
        showError(errorDetail.message || "An error occurred");
      }

    } catch (error) {
      console.error("Network error:", error);
      showError("Network error. Please check your connection and try again.");
    }
  };

  // This ensures the interval timer is cleared if the component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-2">
      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-midnightblue mb-8 tracking-tight">
              Forgot Your Password?
            </h1>
            <p className="text-gray-400 text-center leading-relaxed">
              Enter your email address below and we'll send you a secure link to
              reset your password.
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-midnightblue/70 group-focus-within:text-midnightblue transition-colors duration-200" />
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-midnightblue placeholder-midnightblue/60 focus:outline-none focus:ring-2 focus:ring-midnightblue/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isButtonDisabled}
                />
              </div>
            </div>

            <button
              className={`
                w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform
                ${
                  isButtonDisabled || !email.trim()
                    ? "bg-gray-600/50 cursor-not-allowed scale-95"
                    : "bg-gradient-to-r from-midnightblue to-cyan-500 cursor-pointer hover:scale-x-105 hover:shadow-xl shadow-lg transform transition-all duration-300"
                }
                backdrop-blur-sm 
              `}
              onClick={handleResetReq}
              disabled={isButtonDisabled || !email.trim()}
            >
              <div className="flex items-center justify-center space-x-2">
                {isButtonDisabled ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Please wait ({countdown}s)</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Status Messages */}
          <div className="mt-6 h-20 relative">
            {/* Success Message */}
            {successMsg && (
              <div className="absolute inset-0 transition-all duration-500 transform opacity-100 translate-y-0 scale-100">
                <div className="bg-emerald-500/50 border border-emerald-400/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Reset link sent successfully!
                      </p>
                      <p className="text-white text-sm mt-1">
                        Check your email inbox and spam folder.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {failMsg && (
              <div className="absolute inset-0 transition-all duration-500 transform opacity-100 translate-y-0 scale-100">
                <div className="bg-red-500/50 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {errorMessage || "An error occurred"}
                      </p>
                      <p className="text-white text-sm mt-1">
                        {errorMessage.includes("not found") 
                          ? "This email address is not registered with us."
                          : errorMessage.includes("wait")
                          ? "Too many requests. Please be patient."
                          : "Please try again or contact support."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-midnightblue/60 text-sm">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-midnightblue/60 hover:text-midnightblue font-medium transition-colors duration-200"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;