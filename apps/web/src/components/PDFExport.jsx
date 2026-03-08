
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';

const PDFExport = ({ audit }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const handleExportPDF = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamic import of jsPDF and html2canvas
      const [{ default: jsPDF }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);
      
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add header background (Navy Blue)
      pdf.setFillColor(0, 26, 77); // #001a4d
      pdf.rect(0, 0, pageWidth, 45, 'F');
      
      // Try to load and add logo
      try {
        const logoUrl = 'https://horizons-cdn.hostinger.com/c0045f6c-51c7-4cc1-9b54-fd342ec9cd51/65277f65a696e3d1477adf828ac31c64.png';
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = logoUrl;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        // Add logo to top left
        pdf.addImage(img, 'PNG', 15, 10, 40, 15);
      } catch (imgError) {
        console.warn('Could not load logo for PDF', imgError);
        // Fallback text if logo fails
        pdf.setTextColor(0, 212, 255); // Cyan
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.text('Digital Agence', 15, 20);
      }
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('Rapport d\'Audit Digital', pageWidth - 15, 20, { align: 'right' });
      
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(0, 212, 255); // Cyan
      pdf.text(audit.domain, pageWidth - 15, 30, { align: 'right' });
      
      // Add date
      const date = new Date(audit.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.text(`Date: ${date}`, 15, 55);
      
      // Add overall score
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Score Global', 15, 70);
      
      pdf.setFontSize(36);
      const scoreColor = audit.overallScore >= 70 ? [34, 197, 94] : audit.overallScore >= 50 ? [234, 179, 8] : [239, 68, 68];
      pdf.setTextColor(...scoreColor);
      pdf.text(`${audit.overallScore}/100`, 15, 85);
      
      // Add category scores
      pdf.setTextColor(0, 26, 77); // Navy Blue
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Scores par Catégorie', 15, 105);
      
      let yPos = 115;
      const categories = {
        performance: 'Performance',
        seo: 'SEO',
        socialMedia: 'Réseaux Sociaux',
        reputation: 'Réputation',
        competition: 'Concurrence',
      };
      
      pdf.setFontSize(11);
      Object.entries(categories).forEach(([key, name]) => {
        const score = audit.categories[key]?.score || 0;
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'normal');
        pdf.text(name, 20, yPos);
        
        pdf.setFont(undefined, 'bold');
        const catScoreColor = score >= 70 ? [34, 197, 94] : score >= 50 ? [234, 179, 8] : [239, 68, 68];
        pdf.setTextColor(...catScoreColor);
        pdf.text(`${score}/100`, 80, yPos);
        
        yPos += 8;
      });
      
      // Add recommendations section
      yPos += 15;
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = 20;
      }
      
      pdf.setTextColor(0, 26, 77); // Navy Blue
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Recommandations Principales', 15, yPos);
      yPos += 10;
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      
      // Add top 5 high-priority recommendations
      const allRecommendations = [];
      Object.entries(audit.categories).forEach(([category, data]) => {
        if (data.recommendations) {
          data.recommendations.forEach(rec => {
            allRecommendations.push({ ...rec, category: categories[category] });
          });
        }
      });
      
      const highPriorityRecs = allRecommendations
        .filter(rec => rec.priority === 'high')
        .slice(0, 5);
      
      highPriorityRecs.forEach((rec, index) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = 20;
        }
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'bold');
        pdf.text(`${index + 1}. ${rec.title}`, 20, yPos);
        yPos += 6;
        
        pdf.setFont(undefined, 'normal');
        const descLines = pdf.splitTextToSize(rec.description, pageWidth - 40);
        pdf.text(descLines, 20, yPos);
        yPos += descLines.length * 5 + 8;
      });
      
      // Add footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        // Footer line
        pdf.setDrawColor(0, 212, 255); // Cyan
        pdf.setLineWidth(0.5);
        pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
        
        pdf.setFontSize(8);
        pdf.setTextColor(0, 26, 77); // Navy Blue
        pdf.setFont(undefined, 'bold');
        pdf.text('Digital Agence Web&SEO', 15, pageHeight - 8);
        
        pdf.setTextColor(128, 128, 128);
        pdf.setFont(undefined, 'normal');
        pdf.text('digitalagence.fr', 60, pageHeight - 8);
        
        pdf.text(
          `Page ${i}/${totalPages}`,
          pageWidth - 15,
          pageHeight - 8,
          { align: 'right' }
        );
      }
      
      // Save PDF
      pdf.save(`audit-${audit.domain}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: 'PDF généré avec succès',
        description: 'Le rapport a été téléchargé.',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de générer le PDF. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button
      onClick={handleExportPDF}
      disabled={isGenerating}
      className="bg-[#001a4d] hover:bg-[#002b80] text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-[#00d4ff]/30"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Génération...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4 text-[#00d4ff]" />
          Télécharger le PDF
        </>
      )}
    </Button>
  );
};

export default PDFExport;
