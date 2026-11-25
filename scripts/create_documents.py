"""Génère les livrables publics à partir du contenu factuel du dépôt.
Dépendances facultatives : reportlab, openpyxl et pypdf.
Aucun accès aux mails ni à Drive n'est nécessaire.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
from pypdf import PdfReader, PdfWriter

ROOT=Path(__file__).resolve().parent.parent
DATA=json.loads((ROOT/"data/portfolio.json").read_text(encoding="utf-8"))
SOURCES=json.loads((ROOT/"data/veille.json").read_text(encoding="utf-8"))
FONT="Helvetica"
BOLD="Helvetica-Bold"
for regular,bold in [
 (Path("C:/Windows/Fonts/arial.ttf"),Path("C:/Windows/Fonts/arialbd.ttf")),
 (Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
]:
 if regular.exists() and bold.exists():
  pdfmetrics.registerFont(TTFont("Portfolio",str(regular)))
  pdfmetrics.registerFont(TTFont("PortfolioBold",str(bold)))
  pdfmetrics.registerFontFamily("Portfolio",normal="Portfolio",bold="PortfolioBold")
  FONT="Portfolio";BOLD="PortfolioBold";break
INK=colors.HexColor("#172c3a");BLUE=colors.HexColor("#1d4ed8");MUTED=colors.HexColor("#51626e")
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name="CvName",fontName=BOLD,fontSize=24,leading=28,textColor=INK,spaceAfter=5))
styles.add(ParagraphStyle(name="CvRole",fontName=BOLD,fontSize=10.5,leading=14,textColor=BLUE,spaceAfter=7))
styles.add(ParagraphStyle(name="CvBody",fontName=FONT,fontSize=9,leading=12.7,textColor=INK,spaceAfter=4))
styles.add(ParagraphStyle(name="CvSmall",fontName=FONT,fontSize=8,leading=11,textColor=MUTED,spaceAfter=3))
styles.add(ParagraphStyle(name="CvSection",fontName=BOLD,fontSize=10.4,leading=14,textColor=BLUE,spaceBefore=12,spaceAfter=6))
def P(text,style="CvBody"):return Paragraph(text,styles[style])
flow=[]
head=[[P("LUCAS BARNABA","CvName"),Image(str(ROOT/"assets/portrait-lucas.png"),width=62,height=75)],
      [P("Étudiant en deuxième année de BTS SIO · option SLAM","CvRole"),""],
      [P("Évry-Courcouronnes · Île-de-France<br/>"+escape(DATA["email"]),"CvSmall"),""]]
header=Table(head,colWidths=[430,62])
header.setStyle(TableStyle([("SPAN",(1,0),(1,2)),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),1)]))
flow.append(header)
flow.append(P("Développement web, données et applications métier. Je souhaite consolider mes pratiques de conception, de programmation et de test, puis poursuivre mes études, si possible en alternance."))
flow.append(P('Portfolio et sources : <link href="'+escape(DATA["repository"])+'">github.com/lucasbarnaba57-del/Mon_Portfolio</link>',"CvSmall"))
flow.append(P("FORMATION","CvSection"))
flow.append(P("<b>BTS SIO · Solutions logicielles et applications métiers</b> — en cours, deuxième année, session 2027.<br/>Lycée du Parc des Loges, Évry-Courcouronnes."))
flow.append(P("<b>Baccalauréat STMG · 2025</b> — Lycée Parc des Loges, Évry-Courcouronnes. Spécialité Systèmes d’information de gestion."))
flow.append(P("STAGE ET PROJETS DE FORMATION","CvSection"))
flow.append(P("<b>Auto École Excellence · 18 mai – 27 juin 2026 · binôme</b><br/>Conception de la section Formules en HTML/CSS/JavaScript, présentation des offres, onglets et adaptation aux écrans. Prototype de stage ; fiche et preuves dans le portfolio."))
flow.append(P("<b>Élégance Pluvieuse · projet pédagogique PHP / PDO / MySQL</b><br/>Catalogue, comptes clients, panier et back-office. Fonctionnement, contribution et limites détaillés dans le portfolio."))
flow.append(P("<b>Épi Solidaire · application pédagogique PHP / PDO / MVC</b><br/>Stocks, commandes et livraisons. Sources, schéma et analyse technique présentés dans le portfolio."))
flow.append(P("PRATIQUES ET OUTILS","CvSection"))
flow.append(P("<b>Web :</b> HTML, CSS, JavaScript, PHP / PDO. <b>Données :</b> SQL / MySQL.<br/><b>Programmation :</b> bases de Java. <b>Outils :</b> VS Code, GitHub, WampServer, phpMyAdmin."))
flow.append(P("FORMATIONS COMPLÉMENTAIRES","CvSection"))
flow.append(P("<b>Atelier RGPD · CNIL</b> — cinq attestations de suivi vérifiées : modules 1, 3, 4, 5 et 6, de septembre à novembre 2025. Justificatifs consultables dans le portfolio."))
flow.append(P("AUTRES EXPÉRIENCES","CvSection"))
flow.append(P("<b>Chronodrive</b> · Équipier polyvalent · sept. 2025 – fév. 2026<br/>Préparation de commandes, stocks surgelés, respect des procédures et accueil client."))
flow.append(P("<b>Andiamo</b> · Serveur · juil. – août 2025<br/><b>Boulangerie</b> · Vendeur · sept. 2024 – mars 2025<br/><b>Particuliers</b> · Baby-sitter · janv. – nov. 2023"))
flow.append(Spacer(1,7))
flow.append(P("Version publique du 25 novembre 2026 · Projets, contributions et justificatifs détaillés dans le portfolio.","CvSmall"))
cvpath=ROOT/"cv/CV_Lucas_Barnaba_Developpement.pdf"
cvpath.parent.mkdir(exist_ok=True)
doc=SimpleDocTemplate(str(cvpath),pagesize=A4,leftMargin=48,rightMargin=48,topMargin=35,bottomMargin=30,title="CV Lucas Barnaba — Développement",author="Lucas Barnaba")
doc.build(flow)
assert len(PdfReader(cvpath).pages)==1,"Le CV doit tenir sur une page."
writer=PdfWriter()
for c in DATA["certifications"]:writer.append(str(ROOT/c["path"]))
with (ROOT/"docs/certifications/Atelier_RGPD_Attestations_Lucas_Barnaba.pdf").open("wb") as f:writer.write(f)
wb = Workbook()
ws = wb.active
ws.title = "Mes compétences"
# Le CSV et la page HTML sont générés ensemble par scripts/build.mjs.
import csv
with (ROOT / "docs/tableau-synthese-travail.csv").open(encoding="utf-8-sig", newline="") as source:
    for row in csv.reader(source, delimiter=";"):
        ws.append(row)
for cell in ws[1]:
    cell.font = Font(name="Calibri", bold=True, color="FFFFFF", size=12)
    cell.fill = PatternFill("solid", fgColor="74352B")
for row in list(ws.rows)[1:]:
    for cell in row:
        cell.font = Font(name="Calibri", size=11, color="282720")
        cell.alignment = Alignment(vertical="center", wrap_text=True)
    ws.row_dimensions[row[0].row].height = 50
ws.column_dimensions["A"].width = 48
ws.column_dimensions["B"].width = 80
ws.row_dimensions[1].height = 24
ws.freeze_panes = "A2"
ws.sheet_view.showGridLines = False
ws.page_setup.orientation = "landscape"
ws.page_setup.fitToWidth = 1
ws.sheet_properties.pageSetUpPr.fitToPage = True
wb.save(ROOT / "docs/tableau-synthese-travail.xlsx")
print(json.dumps({"cv_pages":len(PdfReader(cvpath).pages),"attestations_pages":len(PdfReader(ROOT/"docs/certifications/Atelier_RGPD_Attestations_Lucas_Barnaba.pdf").pages),"tableau_sheets":wb.sheetnames},ensure_ascii=True))
