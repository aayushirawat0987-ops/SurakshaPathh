import React from 'react';
import { Shield, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-cyber-neonPink" />
          <span className="font-bold tracking-wider text-gray-300">
            SURAKSHA<span className="text-cyber-neonPink">PATH</span>
          </span>
        </div>
        
        <p className="text-sm text-gray-400 text-center">
          Walk Free. Walk Safe. Empowering safety through technology.
        </p>

        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:contact@example.com" className="text-gray-400 hover:text-cyber-neonBlue transition-colors" title="Email">
            <Mail className="w-5 h-5" />
          </a>
          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
