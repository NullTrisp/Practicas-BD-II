package datatypes;

public class Account {
	private String owner;
	private String number;
	private String password;
	private String dni;
	private double credit;

	public Account(final String number, final String owner, final double credit, final String password,
			final String dni) {
		this.owner = owner;
		this.credit = credit;
		this.number = number;
		this.dni = dni;
		this.password = password;
	}

	public String getOwner() {
		return owner;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(final double credit) {
		this.credit = credit;
	}

	public String getNumber() {
		return number;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(final String password) {
		this.password = password;
	}

	public void deposit(final double credit) {
		this.credit += credit;
	}

	public boolean retrieve(final double credit) {
		boolean success = false;
		if (credit <= this.credit && credit > 0) {
			this.credit -= credit;
			success = !success;
		}
		return success;
	}

	@Override
	public String toString() {
		return "Owner: " + this.owner + ", Account Number: " + this.number + ", Credit: " + this.credit;
	}

	public String getDni() {
		return dni;
	}

}
