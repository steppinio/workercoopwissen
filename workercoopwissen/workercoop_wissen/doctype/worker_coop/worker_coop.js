// Copyright (c) 2026, Jan Steppe and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Worker Coop", {
// 	refresh(frm) {

// 	},
// });


frappe.ui.form.on('Worker Coop', { // Frappe Standard Funktion, um auf Events eines Formulars zu reagieren
    refresh: function(frm) { // Event-Name refresh: Feuert beim Öffnen oder Neu-Rendern des Formulars, frm ist aktuelle Formular (alle Felder, Werte und Methoden
        frm.set_query("subsectors", "sector_assignments", function(doc, cdt, cdn) { // set_query: Methode, um Link-Feld Dropdowns zu filtern, "subsectors" soll gefiltert werden, "sectors_assignments" Feld von Childt-Tabelle, function(doc, cdt, cdn) Call-Back Funktion, jedes mal wenn Dropdown geöffnet wird, doc (Parent-Dokument), cdt (Child DocType), cdn (Child DocName) ID aktuelle Zeile
            let row = locals[cdt][cdn]; // locals: globaler Cache aller geladener Dokument im aktuellen Form, gibt aktuelle Zeile zurück
            if (!row.sector) {return {filters: { name: "__none__" }};} // Wenn kein Sektor ausgewählt ist subsector Dopdown leer
            return { // Wenn Sektor ausgewählt ist, filtern wir Subsektoren basierend auf dem ausgewählten Sektor
                filters: {
                    "parent_sector": row.sector // Das Feld 'parent_sector' muss mit dem Wert aus der Zeile übereinstimmen
                }
            };
        });
    }
});

// Optional: Wenn der Sektor in der Zeile geändert wird, 
// sollte das Subsektor-Feld geleert werden, da die alte Auswahl nicht mehr passt.
frappe.ui.form.on('Worker Coop Sector Assignment', {
    sector: function(frm, cdt, cdn) {frappe.model.set_value(cdt, cdn, "subsectors", "");}
});
