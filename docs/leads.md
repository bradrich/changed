# Project Leads
{% leads.forEach(function (lead) { %}
## [{%= lead.name %}]({%= lead.email %})
* Role: {%= lead.role %}
{% }) %}