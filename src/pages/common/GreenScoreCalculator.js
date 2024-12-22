//GreenScoreCalculator.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuration for environmental impact factors
const ENVIRONMENTAL_FACTORS = {
  // Raw Materials Impact (0-25 points)
  rawMaterials: {
    organic: 25,
    sustainable: 20,
    mixed: 15,
    conventional: 10,
    synthetic: 5
  },
  
  // Production Process Impact (0-25 points)
  productionProcess: {
    traditional: 25,
    semiAutomated: 20,
    fullyAutomated: 15,
    industrialized: 10
  },
  
  // Packaging Impact (0-20 points)
  packaging: {
    minimal: 20,
    recyclable: 15,
    mixed: 10,
    plastic: 5
  },
  
  // Transportation Impact (0-15 points)
  transportation: {
    local: 15,
    regional: 12,
    national: 8,
    international: 5
  },
  
  // Shelf Life Impact (0-15 points)
  shelfLife: {
    veryShort: 15, // 1-3 days
    short: 12,     // 4-7 days
    medium: 8,     // 1-4 weeks
    long: 5        // > 1 month
  }
};

class GreenScoreCalculator {
  constructor() {
    // Initialize Gemini API
    this.genAI = new GoogleGenerativeAI("AIzaSyAzBDNc5K5N3h7ZYLs3u0oxseP6tRx3CUY");
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async analyzeProduct(productName, category) {
    try {
      const prompt = `Analyze the environmental impact of the following product and provide a JSON response with these exact keys:
        {
          "rawMaterials": one of [organic, sustainable, mixed, conventional, synthetic],
          "productionProcess": one of [traditional, semiAutomated, fullyAutomated, industrialized],
          "packaging": one of [minimal, recyclable, mixed, plastic],
          "transportation": one of [local, regional, national, international],
          "shelfLife": one of [veryShort, short, medium, long]
        }
        
        Product Name: ${productName}
        Category: ${category}
        
        Consider factors like:
        - Raw materials sustainability
        - Production process complexity
        - Typical packaging requirements
        - Common transportation distances
        - Expected shelf life
        
        Respond only with the JSON object, no additional text.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse AI response
      const analysis = JSON.parse(text);
      return this.calculateScore(analysis);
    } catch (error) {
      console.error('Error analyzing product:', error);
      return this.getFallbackScore(productName, category);
    }
  }

  calculateScore(analysis) {
    let totalScore = 0;

    // Calculate raw materials score
    totalScore += ENVIRONMENTAL_FACTORS.rawMaterials[analysis.rawMaterials] || 0;

    // Calculate production process score
    totalScore += ENVIRONMENTAL_FACTORS.productionProcess[analysis.productionProcess] || 0;

    // Calculate packaging score
    totalScore += ENVIRONMENTAL_FACTORS.packaging[analysis.packaging] || 0;

    // Calculate transportation score
    totalScore += ENVIRONMENTAL_FACTORS.transportation[analysis.transportation] || 0;

    // Calculate shelf life score
    totalScore += ENVIRONMENTAL_FACTORS.shelfLife[analysis.shelfLife] || 0;

    return totalScore;
  }

  getFallbackScore(productName, category) {
    // Predefined scores for common food items
    const foodScores = {
      'mawa cake': {
        rawMaterials: 'conventional',
        productionProcess: 'traditional',
        packaging: 'minimal',
        transportation: 'local',
        shelfLife: 'short'
      },
      'bread': {
        rawMaterials: 'conventional',
        productionProcess: 'semiAutomated',
        packaging: 'minimal',
        transportation: 'local',
        shelfLife: 'veryShort'
      },
      'jowar': {
        rawMaterials: 'organic',
        productionProcess: 'traditional',
        packaging: 'minimal',
        transportation: 'regional',
        shelfLife: 'long'
      },
      // Add more products as needed
    };

    const defaultScore = {
      rawMaterials: 'conventional',
      productionProcess: 'semiAutomated',
      packaging: 'mixed',
      transportation: 'regional',
      shelfLife: 'medium'
    };

    const productScore = foodScores[productName.toLowerCase()] || defaultScore;
    return this.calculateScore(productScore);
  }
}

export default GreenScoreCalculator;