import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class TriangleTest {

    @Test
    public void testValidTriangle() {
        assertTrue(Triangle.isValid(3, 4, 5));
    }

    @Test
    public void testScaleneTriangle() throws InvalidTriangleException {
        assertEquals("Scalene", Triangle.getType(3, 4, 5));
    }

    @Test
    public void testScaleneAllOrders() throws InvalidTriangleException {
        assertEquals("Scalene", Triangle.getType(4, 5, 3));
        assertEquals("Scalene", Triangle.getType(5, 3, 4));
        assertEquals("Scalene", Triangle.getType(3, 5, 4));
    }

    @Test
    public void testZeroLengthSide() {
        assertFalse(Triangle.isValid(0, 4, 5));
    }

    @Test
    public void testInvalidTriangleException() {
        assertThrows(InvalidTriangleException.class, () -> {
            Triangle.getType(1, 2, 10);
        });
    }

    @Test
    public void testEquilateralTriangle() throws InvalidTriangleException {
        assertEquals("Equilateral", Triangle.getType(5, 5, 5));
    }

    @Test
    public void testIsoscelesTriangle() throws InvalidTriangleException {
        assertEquals("Isosceles", Triangle.getType(5, 5, 3));
    }

    @Test
    public void testIsoscelesAllOrders() throws InvalidTriangleException {
        assertEquals("Isosceles", Triangle.getType(5, 3, 5));
        assertEquals("Isosceles", Triangle.getType(3, 5, 5));
    }

    @Test
    public void testNegativeNumbers() {
        assertFalse(Triangle.isValid(-1, 4, 5));
        assertFalse(Triangle.isValid(3, -2, 5));
        assertFalse(Triangle.isValid(3, 4, -5));
    }

    @Test
    public void testViolatesTriangleInequality() {
        assertFalse(Triangle.isValid(1, 1, 2));
        assertFalse(Triangle.isValid(1, 2, 3));
        assertFalse(Triangle.isValid(1, 2, 4));
    }

    @Test
    public void testMultipleZeros() {
        assertFalse(Triangle.isValid(0, 0, 5));
        assertFalse(Triangle.isValid(0, 5, 0));
        assertFalse(Triangle.isValid(5, 0, 0));
        assertFalse(Triangle.isValid(0, 0, 0));
    }
}