package handlers;

import org.basex.core.*;
import org.basex.core.cmd.*;

public class DB {
	private Context context;
	private String query;
	private String DBName;

	public DB(final String DBName, final String DBPath) {
		try {
			this.DBName = DBName;
			this.context = new Context();
			new CreateDB(DBName, DBPath).execute(this.context);
			new Close().execute(this.context);
			new Open(DBName).execute(this.context);
		} catch (final BaseXException e) {
			e.printStackTrace();
		}
	}

	public DB query(final String query) {
		try {
			this.query = new XQuery(query).execute(this.context);
		} catch (final BaseXException e) {
			e.printStackTrace();
		}
		return this;
	}

	public void printQuery() {
		System.out.println(this.query);
	}

	public String getQuery() {
		return this.query;
	}

	public void DropDB() {
		try {
			new DropDB(this.DBName).execute(this.context);
			context.close();
		} catch (final BaseXException e) {
			e.printStackTrace();
		}
	}
}
