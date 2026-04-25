import java.util.Scanner;

public class TriangleApp {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter side A: ");
        double a = scanner.nextDouble();

        System.out.println("Enter side B: ");
        double b = scanner.nextDouble();

        System.out.println("Enter side C: ");
        double c = scanner.nextDouble();

        if (!Triangle.isValid(a, b, c)) {
            System.out.println("This is NOT a valid triangle.");
        } else {
            try {
                String type = Triangle.getType(a, b, c);
                System.out.println("This is a valid triangle.");
                System.out.println("Triangle type: " + type);
            } catch (InvalidTriangleException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }

        scanner.close();
    }
}