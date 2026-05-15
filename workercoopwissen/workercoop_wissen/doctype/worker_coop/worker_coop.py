# Copyright (c) 2026, Jan Steppe and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class WorkerCoop(Document):
	def validate(self): # self // serverseitige Referenz für aktuelle Dokument
		wm = self.worker_members or 0
		nmw= self.non_member_workers or 0
		nwvm = self.non_worker_voting_members or 0
		
		self.total_workforce = wm + nmw
		self.total_members = wm + nwvm

		# Anteil Worker-Members an Belegschschaft
		if self.total_workforce > 0:
			self.worker_member_ratio = (wm / self.total_workforce) * 100
		else:
			self.worker_member_ratio = 0
		
		# Anteil Worker-Members an Gesamtmitgliedern
		if self.total_members > 0:
			self.member_worker_ratio = (wm / self.total_members) * 100
		else:
			self.member_worker_ratio = 0

