import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { 
  Users, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Settings, 
  Package, 
  Shield,
  Search,
  Eye,
  UserX,
  UserCheck,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Zap,
  HelpCircle,
  Database,
  Globe,
  Lock
} from 'lucide-react';

interface TabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const AdminPanelPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  // Sample data - replace with real API calls
  const [users] = useState([
    { id: '1', email: 'john@example.com', username: 'john_doe', status: 'active', plan: 'Pro', lastLogin: '2024-01-15', created: '2023-12-01' },
    { id: '2', email: 'jane@example.com', username: 'jane_smith', status: 'suspended', plan: 'Basic', lastLogin: '2024-01-10', created: '2023-11-15' },
    { id: '3', email: 'bob@example.com', username: 'bob_wilson', status: 'active', plan: 'Enterprise', lastLogin: '2024-01-14', created: '2023-10-20' }
  ]);

  const [plans] = useState([
    { id: '1', name: 'Basic', price: 9.99, features: ['5 Projects', '10GB Storage', 'Email Support'], active: true, users: 150 },
    { id: '2', name: 'Pro', price: 29.99, features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'], active: true, users: 75 },
    { id: '3', name: 'Enterprise', price: 99.99, features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support', '1TB Storage'], active: true, users: 25 }
  ]);

  const [tickets] = useState([
    { id: '1', subject: 'Login Issues', user: 'john@example.com', status: 'open', priority: 'high', created: '2024-01-15', updated: '2024-01-15' },
    { id: '2', subject: 'Billing Question', user: 'jane@example.com', status: 'pending', priority: 'medium', created: '2024-01-14', updated: '2024-01-14' },
    { id: '3', subject: 'Feature Request', user: 'bob@example.com', status: 'closed', priority: 'low', created: '2024-01-13', updated: '2024-01-15' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const tabs: TabProps[] = [
    { id: 'users', label: 'User Management', icon: <Users className="h-5 w-5" />, count: users.length },
    { id: 'plans', label: 'Plans & Features', icon: <Package className="h-5 w-5" />, count: plans.length },
    { id: 'payments', label: 'Payment Gateways', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'email', label: 'Email Settings', icon: <Mail className="h-5 w-5" /> },
    { id: 'support', label: 'Support Tickets', icon: <MessageSquare className="h-5 w-5" />, count: tickets.filter(t => t.status !== 'closed').length },
    { id: 'system', label: 'System Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-red-600 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage user accounts, view activity, and control access</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'suspended').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$12,450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Users</h3>
          <p className="text-sm text-gray-500 mt-1">
            💡 <strong>Tip:</strong> Use the search bar to quickly find users. Click "View" to see detailed user information or "Impersonate" to login as that user for troubleshooting.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.filter(user => 
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">@{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-orange-600 hover:text-orange-700">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Impersonate
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={user.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {user.status === 'active' ? <UserX className="h-4 w-4 mr-1" /> : <UserCheck className="h-4 w-4 mr-1" />}
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlanManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Plans & Features</h2>
          <p className="text-gray-600 mt-1">Manage subscription plans, pricing, and feature sets</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Plan Management Tips</h3>
            <p className="text-sm text-blue-800 mt-1">
              • Set competitive pricing based on market research • Include clear feature descriptions • Use tiered pricing to encourage upgrades • Monitor plan performance and user feedback
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {plan.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="text-sm text-gray-500 mb-4">
                <Users className="h-4 w-4 inline mr-1" />
                {plan.users} active subscribers
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentGateways = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Gateway Configuration</h2>
        <p className="text-gray-600 mt-1">Configure Stripe, PayPal, and other payment processors</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-amber-900">Security Notice</h3>
            <p className="text-sm text-amber-800 mt-1">
              Always use test API keys during development. Keep production keys secure and never expose them in client-side code.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stripe Configuration */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Stripe</h3>
              <p className="text-sm text-gray-500">Credit cards, digital wallets, bank transfers</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publishable Key
                <span className="text-gray-400 font-normal ml-1">(starts with pk_)</span>
              </label>
              <input
                type="text"
                placeholder="pk_test_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 This key is safe to use in your frontend code
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
                <span className="text-gray-400 font-normal ml-1">(starts with sk_)</span>
              </label>
              <input
                type="password"
                placeholder="sk_test_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔒 Keep this key secure - only use on your server
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook Endpoint Secret
                <span className="text-gray-400 font-normal ml-1">(starts with whsec_)</span>
              </label>
              <input
                type="password"
                placeholder="whsec_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔗 Used to verify webhook signatures from Stripe
              </p>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="stripe-test" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="stripe-test" className="ml-2 text-sm text-gray-700">
                Use test mode (recommended for development)
              </label>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Test Stripe Connection
            </Button>
          </div>
        </div>

        {/* PayPal Configuration */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
              <p className="text-sm text-gray-500">PayPal payments and express checkout</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client ID
              </label>
              <input
                type="text"
                placeholder="AYi4cHnHjqDlvsd89_FImUz..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Found in your PayPal Developer Dashboard
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Secret
              </label>
              <input
                type="password"
                placeholder="EGnHDxD_qRPdaLdZz8iCr8N7..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔒 Keep this secret secure
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook ID
              </label>
              <input
                type="text"
                placeholder="8PT597110X687430LKGECATA"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔗 For receiving payment notifications
              </p>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="paypal-sandbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
              <label htmlFor="paypal-sandbox" className="ml-2 text-sm text-gray-700">
                Use sandbox mode (recommended for testing)
              </label>
            </div>

            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              Test PayPal Connection
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Apple Pay</h4>
            <p className="text-sm text-gray-500 mt-1">Configure Apple Pay integration</p>
            <Button size="sm" variant="outline" className="mt-3">Configure</Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Google Pay</h4>
            <p className="text-sm text-gray-500 mt-1">Setup Google Pay payments</p>
            <Button size="sm" variant="outline" className="mt-3">Configure</Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Bank Transfer</h4>
            <p className="text-sm text-gray-500 mt-1">Direct bank transfer setup</p>
            <Button size="sm" variant="outline" className="mt-3">Configure</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Settings</h2>
          <p className="text-gray-600 mt-1">Configure SMTP settings and test email delivery</p>
        </div>
        <Button 
          onClick={() => navigate('/admin/email-settings')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Mail className="h-4 w-4 mr-2" />
          Advanced Settings
        </Button>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-900">Email System Status</h3>
            <p className="text-sm text-green-800 mt-1">
              ✅ SMTP configured and working • Last test: successful • Ready to send emails
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Email Test</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Email Address
              </label>
              <input
                type="email"
                placeholder="test@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Emails sent today</span>
              <span className="text-sm font-medium text-gray-900">127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Delivery rate</span>
              <span className="text-sm font-medium text-green-600">98.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Bounce rate</span>
              <span className="text-sm font-medium text-red-600">1.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Queue status</span>
              <span className="text-sm font-medium text-gray-900">Empty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-gray-600 mt-1">Manage customer support requests and escalations</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Tickets</option>
            <option>Open</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'open').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'closed').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Support Best Practices</h3>
            <p className="text-sm text-blue-800 mt-1">
              • Respond to high-priority tickets within 1 hour • Use templates for common issues • Escalate complex technical issues to developers • Always follow up after resolution
            </p>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                      <div className="text-sm text-gray-500">{ticket.subject}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {ticket.priority === 'medium' && <Clock className="w-3 h-3 mr-1" />}
                      {ticket.priority === 'low' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.updated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-orange-600 hover:text-orange-700">
                        <Zap className="h-4 w-4 mr-1" />
                        Escalate
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Application Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Name</label>
              <input
                type="text"
                defaultValue="MyApp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                defaultValue="support@myapp.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="maintenance" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="maintenance" className="ml-2 text-sm text-gray-700">
                Enable maintenance mode
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="two-factor" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <label htmlFor="two-factor" className="ml-2 text-sm text-gray-700">
                Require 2FA for admin accounts
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Database & Backup</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="p-4 bg-green-100 rounded-lg mb-3">
              <Database className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900">Database Health</h4>
            <p className="text-sm text-green-600 mt-1">Excellent</p>
            <Button size="sm" variant="outline" className="mt-2">Check Status</Button>
          </div>
          <div className="text-center">
            <div className="p-4 bg-blue-100 rounded-lg mb-3">
              <Shield className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900">Last Backup</h4>
            <p className="text-sm text-gray-600 mt-1">2 hours ago</p>
            <Button size="sm" variant="outline" className="mt-2">Create Backup</Button>
          </div>
          <div className="text-center">
            <div className="p-4 bg-purple-100 rounded-lg mb-3">
              <Lock className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900">Security Scan</h4>
            <p className="text-sm text-gray-600 mt-1">Clean</p>
            <Button size="sm" variant="outline" className="mt-2">Run Scan</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users': return renderUserManagement();
      case 'plans': return renderPlanManagement();
      case 'payments': return renderPaymentGateways();
      case 'email': return renderEmailSettings();
      case 'support': return renderSupportTickets();
      case 'system': return renderSystemSettings();
      default: return renderUserManagement();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="p-2 bg-red-600 rounded-lg mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/dashboard')}
              >
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-3 flex-1 text-left">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
