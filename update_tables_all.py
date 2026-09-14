import json
import re

file_path = '/Users/navnitrai/Desktop/My/pasport/data/countries-specs.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def update_table_html(html_str):
    if not html_str:
        return html_str
        
    pattern = r'<table>(.*?)</table>'
    def table_replacer(match):
        inner = match.group(1)
        
        inner = re.sub(r'<thead>', r"<thead class='bg-slate-50 border-b border-slate-200'>", inner)
        inner = re.sub(r'<th>', r"<th class='p-4 font-semibold text-slate-700'>", inner)
        inner = re.sub(r'<tbody>', r"<tbody class='divide-y divide-slate-100'>", inner)
        
        def tr_replacer(tr_match):
            tr_inner = tr_match.group(1)
            first_td = True
            def td_replacer(td_match):
                nonlocal first_td
                if first_td:
                    first_td = False
                    return "<td class='p-4 text-slate-600 font-medium'>"
                else:
                    return "<td class='p-4 text-slate-600'>"
            
            tr_inner = re.sub(r'<td>', td_replacer, tr_inner)
            return "<tr>" + tr_inner + "</tr>"

        inner = re.sub(r'<tr>(.*?)</tr>', tr_replacer, inner, flags=re.DOTALL)
        
        return f"<div class='overflow-x-auto my-8 border border-slate-200 rounded-2xl'>\n<table class='w-full text-left text-sm'>{inner}</table>\n</div>"

    html_str = re.sub(pattern, table_replacer, html_str, flags=re.DOTALL)
    return html_str

for item in data:
    if 'passportcontent' in item and isinstance(item['passportcontent'], str):
        item['passportcontent'] = update_table_html(item['passportcontent'])
    if 'visacontent' in item and isinstance(item['visacontent'], str):
        item['visacontent'] = update_table_html(item['visacontent'])

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Finished updating all tables.")
