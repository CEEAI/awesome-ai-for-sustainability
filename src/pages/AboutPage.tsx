
import React from 'react';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Users, Target, Eye, MessageCircle } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            {t('about.title')}
          </h1>
          <p className="text-xl text-brand-600 font-medium mb-6 animate-fade-in">
            {t('about.subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in">
            {t('about.description')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-brand-100 rounded-lg mr-4">
                  <Target className="w-6 h-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('about.mission.title')}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission.desc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('about.vision.title')}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision.desc')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('about.contact.title')}
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* Left Column - Contact Info */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-brand-100 rounded-lg">
                    <Mail className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('about.contact.email')}</p>
                    <p className="text-sm text-gray-600">admin@ceeai.net</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-brand-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('about.contact.address')}</p>
                    <p className="text-sm text-gray-600">{t('about.contact.addressValue')}</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - WeChat QR Code */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-medium text-gray-900 text-lg">{t('about.contact.wechat')}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <img 
                    src="/lovable-uploads/63b01435-7c0e-4b5c-b20b-95593ad187a2.png" 
                    alt="CEEAI WeChat QR Code" 
                    className="w-32 h-32 rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">扫描关注公众号</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
