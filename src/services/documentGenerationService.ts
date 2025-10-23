// Document Generation Service
// Generates Word and Excel documents from audit results

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuditResult } from './websiteAuditService';

export interface DocumentOptions {
  includeCharts?: boolean;
  includeScreenshots?: boolean;
  includeCompetitiveAnalysis?: boolean;
  includeTechnicalDetails?: boolean;
  includeRecommendations?: boolean;
  includePrompts?: boolean;
}

class DocumentGenerationService {
  
  // Generate Word document
  async generateWordDocument(auditResult: AuditResult, options: DocumentOptions = {}): Promise<void> {
    console.log('DocumentGenerationService: Starting Word document generation...');
    console.log('Audit result:', auditResult);
    
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title Page
            new Paragraph({
              children: [
                new TextRun({
                  text: "Website Audit Report",
                  bold: true,
                  size: 32,
                  color: "f97316"
                })
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: auditResult.url,
                  size: 24,
                  color: "666666"
                })
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 }
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Audit Date: ${new Date(auditResult.timestamp).toLocaleDateString()}`,
                  size: 20,
                  color: "999999"
                })
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 }
            }),

            // Executive Summary
            new Paragraph({
              children: [
                new TextRun({
                  text: "Executive Summary",
                  bold: true,
                  size: 28,
                  color: "f97316"
                })
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 }
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Overall Score: ${auditResult.overallScore}/100`,
                  bold: true,
                  size: 24,
                  color: this.getScoreColor(auditResult.overallScore)
                })
              ],
              spacing: { after: 200 }
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `This comprehensive website audit reveals ${auditResult.overallScore}/100 overall performance score. The analysis identified critical issues and high-priority improvements. Key areas requiring immediate attention include mobile optimization, SEO improvements, and conversion rate optimization.`,
                  size: 22
                })
              ],
              spacing: { after: 400 }
            }),

            // Category Scores
            new Paragraph({
              children: [
                new TextRun({
                  text: "Category Scores",
                  bold: true,
                  size: 28,
                  color: "f97316"
                })
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 }
            }),

            ...this.createCategoryScores(auditResult),

            // Critical Issues
            new Paragraph({
              children: [
                new TextRun({
                  text: "Critical Issues",
                  bold: true,
                  size: 28,
                  color: "f97316"
                })
              ],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 }
            }),

            ...this.createIssuesSection(auditResult),

            // Recommendations
            ...(options.includeRecommendations ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Recommendations",
                    bold: true,
                    size: 28,
                    color: "f97316"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              }),

              ...this.createRecommendationsSection(auditResult)
            ] : []),

            // Contact Information
            ...(auditResult.contactInfo ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Contact Information",
                    bold: true,
                    size: 28,
                    color: "f97316"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              }),

              ...(auditResult.contactInfo.emails.length > 0 ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Email Addresses:",
                      bold: true,
                      size: 24,
                      color: "333333"
                    })
                  ],
                  spacing: { after: 100 }
                }),
                ...auditResult.contactInfo.emails.map(email => 
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${email}`,
                        size: 22
                      })
                    ],
                    spacing: { after: 50 }
                  })
                )
              ] : []),

              ...(auditResult.contactInfo.phones.length > 0 ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Phone Numbers:",
                      bold: true,
                      size: 24,
                      color: "333333"
                    })
                  ],
                  spacing: { before: 200, after: 100 }
                }),
                ...auditResult.contactInfo.phones.map(phone => 
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${phone}`,
                        size: 22
                      })
                    ],
                    spacing: { after: 50 }
                  })
                )
              ] : []),

              ...(auditResult.contactInfo.addresses.length > 0 ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Addresses:",
                      bold: true,
                      size: 24,
                      color: "333333"
                    })
                  ],
                  spacing: { before: 200, after: 100 }
                }),
                ...auditResult.contactInfo.addresses.map(address => 
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${address}`,
                        size: 22
                      })
                    ],
                    spacing: { after: 50 }
                  })
                )
              ] : []),

              ...(auditResult.contactInfo.socialMedia.length > 0 ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Social Media:",
                      bold: true,
                      size: 24,
                      color: "333333"
                    })
                  ],
                  spacing: { before: 200, after: 100 }
                }),
                ...auditResult.contactInfo.socialMedia.map(social => 
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${social.platform}: ${social.url}`,
                        size: 22
                      })
                    ],
                    spacing: { after: 50 }
                  })
                )
              ] : [])
            ] : []),

            // Technical Details
            ...(options.includeTechnicalDetails ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technical Details",
                    bold: true,
                    size: 28,
                    color: "f97316"
                  })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `URL: ${auditResult.url}`,
                    size: 22
                  })
                ],
                spacing: { after: 200 }
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `Audit ID: ${auditResult.id}`,
                    size: 22
                  })
                ],
                spacing: { after: 200 }
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `Timestamp: ${auditResult.timestamp}`,
                    size: 22
                  })
                ],
                spacing: { after: 400 }
              })
            ] : [])
          ]
        }]
      });

      console.log('DocumentGenerationService: Creating document buffer...');
      const buffer = await Packer.toBuffer(doc);
      console.log('DocumentGenerationService: Buffer created, size:', buffer.length);
      
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      console.log('DocumentGenerationService: Blob created, size:', blob.size);
      
      const fileName = `Website-Audit-${auditResult.url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.docx`;
      console.log('DocumentGenerationService: Saving file:', fileName);
      
      saveAs(blob, fileName);
      console.log('DocumentGenerationService: File saved successfully');
    } catch (error) {
      console.error('DocumentGenerationService: Error generating Word document:', error);
      throw error;
    }
  }

  // Generate Excel document
  async generateExcelDocument(auditResult: AuditResult, options: DocumentOptions = {}): Promise<void> {
    console.log('DocumentGenerationService: Starting Excel document generation...');
    
    try {
      const workbook = XLSX.utils.book_new();

      // Summary sheet
      const summaryData = [
        ['Website Audit Summary'],
        ['URL', auditResult.url],
        ['Audit Date', new Date(auditResult.timestamp).toLocaleDateString()],
        ['Overall Score', auditResult.overallScore],
        [''],
        ['Category Scores'],
        ['Category', 'Score', 'Status']
      ];

      Object.entries(auditResult.categories).forEach(([category, data]) => {
        summaryData.push([
          this.formatCategoryName(category),
          data.score,
          data.score >= 80 ? 'Good' : data.score >= 60 ? 'Fair' : 'Poor'
        ]);
      });

      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

      // Issues sheet
      const issuesData = [
        ['Critical Issues'],
        ['Category', 'Issue', 'Severity', 'Description']
      ];

      Object.entries(auditResult.categories).forEach(([category, data]) => {
        data.issues.forEach(issue => {
          issuesData.push([
            this.formatCategoryName(category),
            issue.title,
            issue.severity,
            issue.description
          ]);
        });
      });

      const issuesSheet = XLSX.utils.aoa_to_sheet(issuesData);
      XLSX.utils.book_append_sheet(workbook, issuesSheet, 'Issues');

      // Contact Information sheet
      if (auditResult.contactInfo) {
        const contactData = [
          ['Contact Information'],
          ['Type', 'Value', 'Details']
        ];

        // Add emails
        auditResult.contactInfo.emails.forEach(email => {
          contactData.push(['Email', email, '']);
        });

        // Add phones
        auditResult.contactInfo.phones.forEach(phone => {
          contactData.push(['Phone', phone, '']);
        });

        // Add addresses
        auditResult.contactInfo.addresses.forEach(address => {
          contactData.push(['Address', address, '']);
        });

        // Add social media
        auditResult.contactInfo.socialMedia.forEach(social => {
          contactData.push(['Social Media', social.platform, social.url]);
        });

        // Add business hours
        auditResult.contactInfo.businessHours.forEach(hours => {
          contactData.push(['Business Hours', hours, '']);
        });

        const contactSheet = XLSX.utils.aoa_to_sheet(contactData);
        XLSX.utils.book_append_sheet(workbook, contactSheet, 'Contact Info');
      }

      // Generate and save file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const fileName = `Website-Audit-${auditResult.url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, fileName);
      
      console.log('DocumentGenerationService: Excel file saved successfully');
    } catch (error) {
      console.error('DocumentGenerationService: Error generating Excel document:', error);
      throw error;
    }
  }

  // Helper methods
  private getScoreColor(score: number): string {
    if (score >= 80) return "00AA00"; // Green
    if (score >= 60) return "FFA500"; // Orange
    return "FF0000"; // Red
  }

  private createCategoryScores(auditResult: AuditResult): Paragraph[] {
    return Object.entries(auditResult.categories || {}).map(([category, data]) => 
      new Paragraph({
        children: [
          new TextRun({
            text: `${this.formatCategoryName(category)}: ${data?.score || 0}/100`,
            size: 22,
            color: this.getScoreColor(data?.score || 0)
          })
        ],
        spacing: { after: 200 }
      })
    );
  }

  private createIssuesSection(auditResult: AuditResult): Paragraph[] {
    const issues = this.flattenIssues(auditResult);
    return issues.map(issue => 
      new Paragraph({
        children: [
          new TextRun({
            text: `${(issue.severity || 'medium').toUpperCase()}: ${issue.title || 'Unknown Issue'}`,
            bold: true,
            size: 22,
            color: (issue.severity || 'medium') === 'high' ? 'FF0000' : (issue.severity || 'medium') === 'medium' ? 'FFA500' : '00AA00'
          })
        ],
        spacing: { after: 100 }
      })
    );
  }

  private createRecommendationsSection(auditResult: AuditResult): Paragraph[] {
    const recommendations = Object.values(auditResult.categories || {})
      .flatMap(category => category?.recommendations || []);
    
    return recommendations.map(rec => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${rec?.title || 'Recommendation'}`,
            size: 22
          })
        ],
        spacing: { after: 100 }
      })
    );
  }

  private formatCategoryName(category: string): string {
    return category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private flattenIssues(auditResult: AuditResult) {
    return Object.values(auditResult.categories || {})
      .flatMap(category => category?.issues || []);
  }
}

// Export singleton instance
export const documentGenerationService = new DocumentGenerationService();