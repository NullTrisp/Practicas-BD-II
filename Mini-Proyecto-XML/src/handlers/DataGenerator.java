package handlers;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.basex.core.BaseXException;

import datatypes.Account;

public class DataGenerator {
	private List<Account> accounts;
	private DB db;

	public DataGenerator() {
		this.accounts = new ArrayList<Account>();
		this.db = new DB("storage", "src/storage/storage.xml");
	}

	public DataGenerator generateData() {
		try {
			this.db.query(
					"for $x in /bank/accounts/account return concat($x/@number, ',', $x/owner, ',', $x/credit, ',', $x/password)");
		} catch (BaseXException e) {
			e.printStackTrace();
		}
		String[] rawAccounts = this.db.getQuery().split("\r\n"), rawData;
		for (String account : rawAccounts) {
			rawData = account.split(",");
			this.accounts.add(new Account(rawData[0], rawData[1], Double.parseDouble(rawData[2]), rawData[3]));
		}
		return this;
	}

	public Account login(final String accountNum, final String password) {
		Account found = null;
		for (Account account : this.accounts) {
			if (account.getNumber().equals(accountNum) && account.getPassword().equals(password)) {
				found = account;
				break;
			}
		}
		return found;
	}

	public boolean loginManager(final String pass) {
		try {
			return this.db.query("string(/bank/manager/@password)").getQuery().equals(pass);
		} catch (BaseXException e) {
			e.printStackTrace();
		}
		return false;
	}

	public String executeQuery(final String query) {
		try {
			return this.db.query(query).getQuery();
		} catch (BaseXException e) {
			e.printStackTrace();
		}
		return "";
	}

	public void storeQueryTxt(final String query, final String fileName) {
		try {
			FileWriter out = new FileWriter("src/storage/" + fileName + ".txt");
			out.write(query);
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void storeQueryXml(final String query, final String fileName) {
		try {
			FileWriter out = new FileWriter("src/storage/" + fileName + ".xml");
			out.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?> <result>" + query + "</result>");
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void closeSession() {
		this.db.DropDB();
		this.writeData();
	}

	private void writeData() {
		try {
			String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <bank> <accounts>";
			FileWriter myWriter = new FileWriter("src/storage/storage.xml");
			for (Account account : this.accounts) {
				xml += "<account number='" + account.getNumber() + "'> <owner> " + account.getOwner()
						+ " </owner> <credit> " + account.getCredit() + "</credit> <password> " + account.getPassword()
						+ " </password> </account>";
			}
			xml += "</accounts> <manager password='1234' /> </bank>";
			myWriter.write(xml);
			myWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
