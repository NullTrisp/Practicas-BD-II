package db_handler;

import java.io.*;
import java.util.ArrayList;
import org.basex.core.*;
import org.basex.core.cmd.*;
import org.basex.io.serial.*;
import org.basex.query.*;
import org.basex.query.iter.*;
import org.basex.query.value.*;
import org.basex.query.value.item.*;

public class DB {
	private Context context;

	public DB(final String DBName, final String DBPath) {
		try {
			this.context = new Context();
			new CreateDB(DBName, DBPath).execute(this.context);
			new Close().execute(this.context);
			new Open(DBName).execute(this.context);
			new CreateIndex("fulltext").execute(this.context);
		} catch (BaseXException e) {
			e.printStackTrace();
		}
	}

	public DB query(final String query) {
		try {
			System.out.println(new XQuery(query).execute(this.context));
		} catch (BaseXException e) {
			e.printStackTrace();
		}
		return this;
	}

	public DB process(final String query) {
		try (QueryProcessor proc = new QueryProcessor(query, this.context)) {
			Value result = proc.value();

			System.out.println(result);
		} catch (QueryException e) {
			e.printStackTrace();
		}
		return this;
	}

	public DB getAttributes(final String query) {
		ArrayList<String> queryData = new ArrayList<String>();
		try (QueryProcessor proc = new QueryProcessor(query, this.context)) {
			Iter iter = proc.iter();

			for (Item item; (item = iter.next()) != null;) {
				queryData.add(removeLastChar(item.toJava().toString().split(" ")[1]));
				System.out.println(removeLastChar(item.toJava().toString().split(" ")[1]));
			}
		} catch (QueryException e) {
			e.printStackTrace();
		}

		System.out.println(queryData);
		return this;
	}

	public DB iterate(final String query) {
		try (QueryProcessor proc = new QueryProcessor(query, this.context)) {
			Iter iter = proc.iter();

			for (Item item; (item = iter.next()) != null;) {
				System.out.println(item.toJava());
			}
		} catch (QueryException e) {
			e.printStackTrace();
		}

		return this;
	}

	private String removeLastChar(String s) {
		return s.substring(0, s.length() - 1);
	}

	public DB serialize(final String query) {
		try (QueryProcessor proc = new QueryProcessor(query, this.context)) {
			Iter iter = proc.iter();
			try (Serializer ser = proc.getSerializer(System.out)) {
				for (Item item; (item = iter.next()) != null;) {
					ser.serialize(item);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (QueryException e) {
			e.printStackTrace();
		}
		return this;
	}

	public void DropDB() {
		try {
			new DropIndex("text").execute(this.context);
			new DropIndex("attribute").execute(this.context);
			new DropIndex("fulltext").execute(this.context);
			new DropDB("DBExample").execute(this.context);
			context.close();
		} catch (BaseXException e) {
			e.printStackTrace();
		}
	}
}
