import { useState } from "react";
import { 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Save,
  Eye,
  EyeOff,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  });

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "advanced", label: "Advanced", icon: Settings }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="john.doe@company.com"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Work Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Job Title</label>
            <input
              type="text"
              defaultValue="Project Manager"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Department</label>
            <input
              type="text"
              defaultValue="Engineering"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {key === "email" && <Mail className="w-5 h-5 text-blue-500" />}
                {key === "push" && <Bell className="w-5 h-5 text-green-500" />}
                {key === "sms" && <Smartphone className="w-5 h-5 text-purple-500" />}
                {key === "desktop" && <Monitor className="w-5 h-5 text-orange-500" />}
                <div>
                  <p className="font-medium text-neutral-900 capitalize">{key} Notifications</p>
                  <p className="text-sm text-neutral-600">
                    Receive {key} notifications for important updates
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Notification Types</h3>
        <div className="space-y-3">
          {[
            "Task assignments and updates",
            "Project deadline reminders",
            "Team member mentions",
            "System maintenance alerts",
            "Weekly progress reports"
          ].map((type) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-neutral-700">{type}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-neutral-900">Enable 2FA</p>
            <p className="text-sm text-neutral-600">Add an extra layer of security to your account</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Enable
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Active Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-neutral-900">Windows 10 - Chrome</p>
                <p className="text-sm text-neutral-600">Last active: 2 hours ago</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Current</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium text-neutral-900">iPhone 13 - Safari</p>
                <p className="text-sm text-neutral-600">Last active: 1 day ago</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
            { id: "auto", label: "Auto", icon: Monitor }
          ].map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`p-4 border rounded-lg text-center transition-colors ${
                theme === themeOption.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <themeOption.icon className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
              <p className="font-medium text-neutral-900">{themeOption.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Display Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Compact Mode</p>
              <p className="text-sm text-neutral-600">Reduce spacing for more content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Show Sidebar</p>
              <p className="text-sm text-neutral-600">Always show the navigation sidebar</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Connected Services</h3>
        <div className="space-y-4">
          {[
            { name: "Slack", status: "Connected", color: "green" },
            { name: "GitHub", status: "Connected", color: "green" },
            { name: "Google Drive", status: "Disconnected", color: "red" },
            { name: "Microsoft Teams", status: "Disconnected", color: "red" }
          ].map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center">
                  <span className="text-sm font-medium text-neutral-600">{service.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{service.name}</p>
                  <p className={`text-sm ${service.color === "green" ? "text-green-600" : "text-red-600"}`}>
                    {service.status}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 transition-colors">
                {service.status === "Connected" ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">Export Data</p>
                <p className="text-sm text-neutral-600">Download all your data in JSON format</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
          </button>
          <button className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">Delete Account</p>
                <p className="text-sm text-neutral-600">Permanently delete your account and all data</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return renderProfileTab();
      case "notifications": return renderNotificationsTab();
      case "security": return renderSecurityTab();
      case "appearance": return renderAppearanceTab();
      case "integrations": return renderIntegrationsTab();
      case "advanced": return renderAdvancedTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
            <p className="text-neutral-600">Manage your account preferences and system configuration.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">Settings</h2>
            </div>
            <nav className="p-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
} 