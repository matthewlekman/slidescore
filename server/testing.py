import sys
sys.path.append('/Users/tom/Developer/GitHub/slidescore/server')

from pptxAnalyser import SlideAnalyzer
import json


# Test with your demo deck
if __name__ == '__main__':
    analyzer = SlideAnalyzer('goodPPT.pptx')
    report = analyzer.analyze()
    
    print(json.dumps(report, indent=2))
    
    print(f"\n=== SUMMARY ===")
    print(f"Estimated time: {report['estimated_time_minutes']} minutes")
    print(f"\nCritical issues: {len(report['critical_issues'])}")
    print(f"Warnings: {len(report['warnings'])}")
    print(f"Strengths: {len(report['strengths'])}")