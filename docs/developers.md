# Developers
{% developers.forEach(function (developer) { %}
## [{%= developer.name %}]({%= developer.email %})
* Role: {%= developer.role %}
{% }) %}