export const fakeSalesData = [
  { name: "Z. A.", location: "Tallahassee, United States" },
  { name: "K. T.", location: "Salt Lake City, United States" },
  { name: "M. R.", location: "London, United Kingdom" },
  { name: "S. L.", location: "Toronto, Canada" },
  { name: "J. P.", location: "Sydney, Australia" },
  { name: "A. K.", location: "New Delhi, India" },
  { name: "E. W.", location: "Berlin, Germany" },
  { name: "L. C.", location: "Paris, France" },
  { name: "D. S.", location: "Austin, United States" },
  { name: "R. M.", location: "Dublin, Ireland" },
  { name: "T. H.", location: "Denver, United States" },
  { name: "C. B.", location: "Wellington, New Zealand" },
  { name: "N. J.", location: "Cape Town, South Africa" },
  { name: "F. G.", location: "Rome, Italy" },
  { name: "V. D.", location: "Amsterdam, Netherlands" },
  { name: "P. V.", location: "Mumbai, India" },
  { name: "O. N.", location: "Stockholm, Sweden" },
  { name: "H. Y.", location: "Singapore" },
  { name: "B. T.", location: "Seattle, United States" },
  { name: "G. E.", location: "Madrid, Spain" },
  { name: "W. F.", location: "Vancouver, Canada" },
  { name: "Y. K.", location: "Tokyo, Japan" },
  { name: "I. M.", location: "Dubai, UAE" },
  { name: "Q. Z.", location: "Kuala Lumpur, Malaysia" },
  { name: "U. R.", location: "Zurich, Switzerland" },
  { name: "X. L.", location: "Hong Kong" },
  { name: "K. S.", location: "Chicago, United States" },
  { name: "A. M.", location: "Bangalore, India" },
  { name: "J. D.", location: "New York, United States" },
  { name: "E. S.", location: "Los Angeles, United States" },
  { name: "M. B.", location: "Houston, United States" },
  { name: "S. P.", location: "Phoenix, United States" },
  { name: "D. R.", location: "Philadelphia, United States" },
  { name: "R. C.", location: "San Antonio, United States" },
  { name: "T. M.", location: "San Diego, United States" },
  { name: "C. L.", location: "Dallas, United States" },
  { name: "L. W.", location: "San Jose, United States" },
  { name: "A. H.", location: "Montreal, Canada" },
  { name: "P. G.", location: "Calgary, Canada" },
  { name: "N. K.", location: "Ottawa, Canada" },
  { name: "B. M.", location: "Edmonton, Canada" },
  { name: "F. R.", location: "Manchester, United Kingdom" },
  { name: "G. S.", location: "Birmingham, United Kingdom" },
  { name: "H. B.", location: "Glasgow, United Kingdom" },
  { name: "I. C.", location: "Liverpool, United Kingdom" },
  { name: "V. M.", location: "Melbourne, Australia" },
  { name: "O. P.", location: "Brisbane, Australia" },
  { name: "W. T.", location: "Perth, Australia" },
  { name: "Y. J.", location: "Adelaide, Australia" },
  { name: "J. K.", location: "Auckland, New Zealand" },
  { name: "E. B.", location: "Christchurch, New Zealand" },
  { name: "M. C.", location: "Chennai, India" },
  { name: "S. D.", location: "Hyderabad, India" },
  { name: "A. P.", location: "Pune, India" },
  { name: "D. K.", location: "Kolkata, India" },
  { name: "R. S.", location: "Munich, Germany" },
  { name: "T. B.", location: "Frankfurt, Germany" },
  { name: "C. M.", location: "Hamburg, Germany" },
  { name: "L. P.", location: "Lyon, France" },
  { name: "N. R.", location: "Marseille, France" },
  { name: "P. T.", location: "Milan, Italy" },
  { name: "B. C.", location: "Naples, Italy" },
  { name: "F. M.", location: "Rotterdam, Netherlands" },
  { name: "G. L.", location: "Utrecht, Netherlands" },
  { name: "H. S.", location: "Gothenburg, Sweden" },
  { name: "I. W.", location: "Malmö, Sweden" },
  { name: "V. R.", location: "Barcelona, Spain" },
  { name: "O. B.", location: "Valencia, Spain" },
  { name: "W. M.", location: "Geneva, Switzerland" },
  { name: "Y. P.", location: "Basel, Switzerland" },
  { name: "J. S.", location: "Vienna, Austria" },
  { name: "E. M.", location: "Salzburg, Austria" },
  { name: "M. W.", location: "Brussels, Belgium" },
  { name: "S. K.", location: "Antwerp, Belgium" },
  { name: "A. R.", location: "Lisbon, Portugal" },
  { name: "D. B.", location: "Porto, Portugal" },
  { name: "R. P.", location: "Athens, Greece" },
  { name: "T. S.", location: "Thessaloniki, Greece" },
  { name: "C. K.", location: "Warsaw, Poland" },
  { name: "L. M.", location: "Kraków, Poland" },
  { name: "N. T.", location: "Prague, Czechia" },
  { name: "P. C.", location: "Brno, Czechia" },
  { name: "B. S.", location: "Budapest, Hungary" },
  { name: "F. K.", location: "Debrecen, Hungary" },
  { name: "G. R.", location: "Bucharest, Romania" },
  { name: "H. M.", location: "Cluj-Napoca, Romania" },
  { name: "I. P.", location: "Sofia, Bulgaria" },
  { name: "V. S.", location: "Plovdiv, Bulgaria" },
  { name: "O. M.", location: "Belgrade, Serbia" },
  { name: "W. R.", location: "Novi Sad, Serbia" },
  { name: "Y. S.", location: "Zagreb, Croatia" },
  { name: "J. M.", location: "Split, Croatia" },
  { name: "E. P.", location: "Ljubljana, Slovenia" },
  { name: "M. S.", location: "Maribor, Slovenia" },
  { name: "S. B.", location: "Bratislava, Slovakia" },
  { name: "A. C.", location: "Košice, Slovakia" },
  { name: "D. P.", location: "Tallinn, Estonia" },
  { name: "R. T.", location: "Tartu, Estonia" },
  { name: "T. K.", location: "Riga, Latvia" },
  { name: "C. R.", location: "Vilnius, Lithuania" }
];

export const products = [
  { name: "ordered a Passport Photo", usOnly: false },
  { name: "ordered a Visa Photo", usOnly: false },
  { name: "ordered an ID Photo", usOnly: false },
  { name: "ordered a Green Card Photo", usOnly: true },
  { name: "ordered a Driving License Photo", usOnly: false }
];

export function getRandomSale() {
  const randomPerson = fakeSalesData[Math.floor(Math.random() * fakeSalesData.length)];
  const isUS = randomPerson.location.includes("United States");
  
  const availableProducts = products.filter(p => isUS || !p.usOnly);
  const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)].name;
  
  const isMinutes = Math.random() > 0.5;
  let timeAgo = "";
  if (isMinutes) {
    const mins = Math.floor(Math.random() * 59) + 1;
    timeAgo = `${mins} minute${mins > 1 ? 's' : ''} ago`;
  } else {
    const hours = Math.floor(Math.random() * 24) + 1;
    timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  return {
    name: randomPerson.name,
    location: randomPerson.location,
    product: randomProduct,
    timeAgo,
  };
}
