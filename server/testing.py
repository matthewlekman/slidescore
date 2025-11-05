import sys
sys.path.append('/Users/tom/Developer/GitHub/slidescore/server')

from pptxAnalyser import SlideAnalyser
import json


# Test with your demo deck
if __name__ == '__main__':
    analyser = SlideAnalyser('goodPPT.pptx')
    report = analyser.analyse()
    
    print(json.dumps(report, indent=2))
    
    print(f"\n=== SUMMARY ===")
    print(f"Estimated time: {report['estimated_time_minutes']} minutes")
    print(f"\nCritical issues: {len(report['critical_issues'])}")
    print(f"Warnings: {len(report['warnings'])}")
    print(f"Strengths: {len(report['strengths'])}")