package handlers;

import org.basex.core.BaseXException;
import org.basex.core.Context;
import org.basex.core.cmd.Close;
import org.basex.core.cmd.CreateDB;
import org.basex.core.cmd.DropDB;
import org.basex.core.cmd.Open;
import org.basex.core.cmd.XQuery;

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

	public DB query(final String query) throws BaseXException {
		this.query = new XQuery(query).execute(this.context);
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
