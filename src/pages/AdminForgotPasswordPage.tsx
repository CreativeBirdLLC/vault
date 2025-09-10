import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Shield, Crown, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { post } from '../utils/api';

const AdminForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic email validation
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      await post('/auth/forgot-password', { email });
      
      // If we get here without an error, the request was successful
      setIsSubmitted(true);
      
    } catch (err: any) {
      console.error('Admin forgot password error:', err);
      // Only show error if it's a real error (not a successful email send)
      if (err.message && !err.message.includes('email sent') && !err.message.includes('successfully')) {
        setError(err.message || 'Failed to send reset email. Please try again.');
      } else {
        // If the error message suggests success, treat it as success
        setIsSubmitted(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <Crown className="h-12 w-12 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HeirGuard Admin
            </span>
          </Link>
        </div>

        <div className="bg-black/40 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-purple-500/20">
          {!isSubmitted ? (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Admin Password Reset
                </h2>
                <p className="mt-2 text-gray-300">
                  Enter your admin email address to receive a secure password reset link
                </p>
              </div>

              {/* Security Warning */}
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-red-300 font-medium">Admin Security Notice</p>
                    <p className="text-xs text-red-400 mt-1">
                      Admin password resets are logged and monitored for security purposes
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3 animate-fade-in">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your admin email"
                      className="pl-10 bg-white/5 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
                  disabled={isLoading || !email}
                  isLoading={isLoading}
                >
                  {isLoading ? (
                    'Sending secure reset link...'
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Send Admin Reset Link</span>
                      <Sparkles className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent">
                  Reset Link Sent
                </h2>
                <p className="mt-2 text-gray-300">
                  A secure password reset link has been sent to <strong className="text-purple-300">{email}</strong>
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-purple-400" />
                    <div className="text-left">
                      <p className="text-sm text-purple-300 font-medium">Admin Security Protocol</p>
                      <p className="text-xs text-purple-400 mt-1">
                        This reset request has been logged. The link expires in 15 minutes.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400">
                  Didn't receive the email? Check your spam folder or contact your system administrator.
                </p>
                
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                    setError('');
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-purple-500/30 text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                >
                  Try again
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/admin/login"
              className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline flex items-center justify-center space-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to admin login</span>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center justify-center space-x-1 group"
          >
            <span>← Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
