// Copyright (c) 2026, Jan Steppe and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Worker Coop", {
// 	refresh(frm) {

// 	},
// });


frappe.ui.form.on('Worker Coop', {
    refresh: function(frm) {
        // Filter für das Link-Feld in der Child Table setzen
        frm.set_query("subsectors", "sector_assignments", function(doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            
            // Falls noch kein Sektor ausgewählt wurde, keine Filterung oder leere Liste
            if (!row.sector) {
                return {};
            }

            return {
                filters: {
                    // Wir filtern tabWorker Coop Subsector
                    // Das Feld 'parent_sector' muss mit dem Wert aus der Zeile übereinstimmen
                    "parent_sector": row.sector
                }
            };
        });
    }
});

// Optional: Wenn der Sektor in der Zeile geändert wird, 
// sollte das Subsektor-Feld geleert werden, da die alte Auswahl nicht mehr passt.
frappe.ui.form.on('Worker Coop Sector Assignment', {
    sector: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, "subsectors", "");
    }
});