public class Triangle {

    public static boolean isValid(double a, double b, double c) {
        // Rainy-day case: zero or negative sides
        if (a <= 0 || b <= 0 || c <= 0) {
            return false;
        }

        // Triangle inequality rule
        return (a + b > c) && (a + c > b) && (b + c > a);
    }

    public static String getType(double a, double b, double c) throws InvalidTriangleException {
        if (!isValid(a, b, c)) {
            throw new InvalidTriangleException("Invalid triangle sides.");
        }

        if (a == b && b == c) {
            return "Equilateral";
        } else if (a == b || b == c || a == c) {
            return "Isosceles";
        } else {
            return "Scalene";
        }
    }
}