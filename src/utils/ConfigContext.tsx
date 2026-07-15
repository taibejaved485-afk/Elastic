import React, { createContext, useContext, useState, useEffect } from "react";

export interface WebsiteConfig {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  aboutTitle: string;
  aboutDescription: string;
  missionTitle: string;
  missionDescription: string;
  servicesTitle: string;
  servicesSubtitle: string;
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  elasticStretchVal: string;
  qualityMetricVal: string;
  durabilityMetricVal: string;
  stretchBenefitTitle: string;
  stretchBenefitDesc: string;
  safeBenefitTitle: string;
  safeBenefitDesc: string;
  qualityBenefitTitle: string;
  qualityBenefitDesc: string;
  durabilityBenefitTitle: string;
  durabilityBenefitDesc: string;
}

const DEFAULT_CONFIG: WebsiteConfig = {
  companyName: "AL-Ramz Exports",
  phone: "0331 1066453",
  email: "info@alramzexports.com",
  address: "Small Industrial Estate, Faisalabad, PK",
  heroTitle: "Premium Elastic Webbing & Industrial Strength",
  heroSubtitle: "Mastering the science of stretch and recovery. Engineered for maximum durability and strength. Trusted Worldwide.",
  heroBadge: "Industrial Grade",
  aboutTitle: "Mastering the science of textile grade industrial materials.",
  aboutDescription: "We are the global benchmark for high-performance premium webbing. Trusted Worldwide, our materials are engineered for industrial, medical, and textile excellence. We combine specialized weaving techniques with modern polymer science to create the highest quality textile grade solutions.",
  missionTitle: "Industrial Webbing Materials.",
  missionDescription: "We believe that the best products start with the best components. Our textile grade webbing is the backbone of premium manufacturing, Trusted Worldwide.",
  servicesTitle: "Industrial Grade Materials & Webbing",
  servicesSubtitle: "Engineered for superior stretch, recovery, and long-term durability in every industrial grade application. Trusted Worldwide for premium textile grade solutions.",
  whyChooseUsTitle: "Engineering Perfection",
  whyChooseUsSubtitle: "Every single fiber we manufacture undergoes rigorous testing to guarantee extreme stretch resistance, clinical safety, and absolute recovery consistency.",
  elasticStretchVal: "800%",
  qualityMetricVal: "100%",
  durabilityMetricVal: "5,000+",
  stretchBenefitTitle: "Super Stretch & Recovery",
  stretchBenefitDesc: "Our elastic can stretch up to 8 times its length and returns to its original size perfectly without losing its grip.",
  safeBenefitTitle: "Skin-Safe & Hypoallergenic",
  safeBenefitDesc: "Our fabrics are certified safe, allergy-free, and perfectly comfortable for long hours of direct contact with skin.",
  qualityBenefitTitle: "Perfect Quality Control",
  qualityBenefitDesc: "We scan every single meter with advanced sensors to ensure uniform thickness, strength, and tension throughout the roll.",
  durabilityBenefitTitle: "Long-Lasting Durability",
  durabilityBenefitDesc: "Built to last through more than 5,000 washes without losing any of its stretch, strength, or premium shape.",
};

interface ConfigContextProps {
  config: WebsiteConfig;
  updateConfig: (newConfig: Partial<WebsiteConfig>) => void;
  resetToDefault: () => void;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem("alramz_website_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse website config", e);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<WebsiteConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem("alramz_website_config", JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.setItem("alramz_website_config", JSON.stringify(DEFAULT_CONFIG));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetToDefault }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
