// Données centralisées : modifiez ici, le site se met à jour partout.
const RESTO = {
  name: "Jongoma",
  tagline: "Restaurant africain · Cuisine sénégalaise et du monde",
  phones: ["06 35 73 81 88", "09 83 47 66 24"],
  address: "16 Rue des écoles, 78250 Meulan-en-Yvelines",
  email: "contact@jongoma.fr", // À remplacer
  // Liens de commande : à remplacer par les vraies URL
  links: { ubereats: "#", deliveroo: "#", express: "#", onlineOrder: "#" },
  hours: [ // 0 = dimanche
    { day: "Dimanche", slots: [["14:00", "22:00"]] },
    { day: "Lundi", slots: [["11:30", "14:30"], ["18:00", "22:00"]] },
    { day: "Mardi", slots: [["11:30", "14:30"], ["18:00", "22:00"]] },
    { day: "Mercredi", slots: [["11:30", "14:30"], ["18:00", "22:00"]] },
    { day: "Jeudi", slots: [["11:30", "14:30"], ["18:00", "22:00"]] },
    { day: "Vendredi", slots: [["11:30", "14:30"], ["18:00", "22:00"]] },
    { day: "Samedi", slots: [["12:00", "23:00"]] },
  ],
};

const MENU = [
  { id: "entrees", title: "Nos Entrées", items: [
    { n: "Pastel au thon", d: "Chaussons au thon", p: "5 pcs · 5,00 €" },
    { n: "Pastel à la viande", d: "Chaussons à la viande", p: "5 pcs · 5,00 €" },
    { n: "Samoussa viande", d: "Chaussons à la viande", p: "4 pcs · 5,00 €" },
    { n: "Soupe harira ou chorba", d: "Soupes orientales (saison)", p: "8,00 €" },
    { n: "Salade mixte", d: "Mélange de salade et de divers ingrédients (saison)", p: "8,00 €" },
  ]},
  { id: "plats", title: "Nos Plats", items: [
    { n: "Thieb poulet, poisson ou à la viande", d: "Le plat national du Sénégal : riz parfumé aux épices, mijoté avec du poulet, du poisson ou de la viande, accompagné de légumes fondants.", p: "14,90 €" },
    { n: "Mafé", d: "Sauce à base de pâte d'arachide parfumée avec des épices africaines, servi avec du riz blanc.", p: "13,90 €" },
    { n: "Yassa poulet", d: "Sauce sénégalaise à base d'oignons caramélisés avec du citron, moutarde et olives, servi avec du riz blanc.", p: "13,90 €" },
    { n: "Foutou sauce graine", d: "Sauce à base de pulpe de graine de palme et poulet, accompagnée d'une pâte à la banane plantain et farine de manioc.", p: "15,00 €" },
    { n: "Soupe kandia", d: "Sauce gombo servie avec du riz blanc.", p: "14,90 €" },
    { n: "Saka saka", d: "Sauce à la feuille de manioc accompagnée de riz blanc.", p: "13,90 €" },
    { n: "Soupe aux pieds de veau", d: "Soupe sénégalaise à base de pied de veau, fortifiante et très appréciée, bien que sa cuisson soit longue.", p: "12,00 €" },
    { n: "Vermicelles au poulet", d: "Poulet grillé accompagné d'une sauce aux oignons.", p: "14,90 €" },
  ]},
  { id: "grillades", title: "Nos Grillades", items: [
    { n: "DIBI Poulet", p: "17,00 €" },
    { n: "DIBI Agneau", p: "20,00 €" },
    { n: "DIBI Mix", p: "25,00 €" },
    { n: "Poulet WESTAF", d: "Poulet rôti, servi avec une salade et des frites.", p: "12,00 €" },
    { n: "Poulet Mayo", d: "Poulet mariné, cuit au four, enveloppé dans une papillote garnie de légumes et agrémenté d'une sauce à base de mayonnaise.", p: "13,00 €" },
    { n: "Grillade de poisson", d: "Dorade grillée avec de l'attiéké et sa sauce.", p: "17,00 €" },
    { n: "Brochette de viande", p: "1 pce · 1,50 €" },
    { n: "Pilons de poulet", p: "1 pce · 1,50 €" },
    { n: "Ailes de poulet", p: "1 pce · 1,50 €" },
    { n: "Cuisse de poulet", p: "1 pce · 3,00 €" },
  ]},
  { id: "accompagnements", title: "Nos Accompagnements", items: [
    { n: "Frites", p: "3,00 €" }, { n: "Alloco", p: "5,00 €" },
    { n: "Riz rouge", p: "5,00 €" }, { n: "Riz blanc", p: "5,00 €" },
    { n: "Riz doré", p: "5,00 €" }, { n: "Attiéké", p: "5,00 €" },
    { n: "Vermicelles", p: "5,00 €" },
  ]},
  { id: "sauces", title: "Nos Sauces", items: [
    { n: "Sauce piment", p: "0,50 €" }, { n: "Sauce verte", p: "0,50 €" },
    { n: "Sauce chili", p: "0,50 €" }, { n: "Sauce moutarde", p: "0,50 €" },
  ]},
  { id: "boissons", title: "Nos Boissons", items: [
    { n: "Eau cristalline", p: "1,00 €" }, { n: "Coca-Cola", p: "1,50 €" },
    { n: "Fanta citron", p: "1,50 €" }, { n: "Oasis", p: "1,50 €" },
    { n: "Orangina", p: "1,50 €" }, { n: "Café", p: "1,50 €" },
    { n: "Café Touba", p: "1,90 €" },
  ]},
  { id: "jus", title: "Nos Jus & Bubble", items: [
    { n: "Bissap", d: "33 cl · 50 cl · 1 L", p: "2,50 € · 5,00 € · 10,00 €" },
    { n: "Gingembre", d: "33 cl · 50 cl · 1 L", p: "2,50 € · 5,00 € · 10,00 €" },
    { n: "Tamarin", d: "33 cl · 50 cl · 1 L", p: "2,50 € · 5,00 € · 8,00 €" },
    { n: "Bubble Bissap", p: "5,00 €" },
    { n: "Bubble Baobab", p: "5,00 €" },
    { n: "Bubble Gingembre", p: "5,00 €" },
  ]},
  { id: "desserts", title: "Nos Desserts", items: [
    { n: "Thiakry (dégué)", d: "Dessert sénégalais à base de céréales de mil et de lait bien aromatisé. PM · GM", p: "2,50 € · 5,00 €" },
    { n: "Tiramisu", d: "Un dessert du nord de la France alliant mascarpone et spéculoos au café.", p: "3,50 €" },
    { n: "Tarte aux daims", d: "Pâte sablée fondante à la fleur de sel, garnie de crème brûlée et de ganache chocolat aux éclats de Daims.", p: "3,50 €" },
    { n: "Moelleux au chocolat", d: "Un moelleux au chocolat, lui, a toujours un cœur coulant.", p: "3,50 €" },
  ]},
];

const ALLERGENS = "Fruits à coque, moutarde, arachide, crevette & céleri";
