import { render, screen } from "@testing-library/react";
import { mockUsers } from "../mocks/users"
import { describe, test, expect } from "vitest";
import UsersTableEntry from "../components/UsersTableEntry";

describe('UsersTableEntry component test', () => {
    test('renders user data', () => {
        const user = mockUsers[0];
        render(
        <table>
            <tbody>
                <UsersTableEntry user={user} colored={false} />
            </tbody>
        </table>
        );
        
        expect(screen.getByText(user.name)).toBeDefined();
        expect(screen.getByText(user.username)).toBeDefined();
        expect(screen.getByText(user.email)).toBeDefined();
        expect(screen.getByText(user.phone)).toBeDefined();
    });

    test("has proper classes without colored prop", () => {
        const user = mockUsers[0];
        const { container } = render(
            <table>
                <tbody>
                    <UsersTableEntry user={user} colored={false} />
                </tbody>
            </table>
        );

        const row = container.firstChild?.childNodes[0].childNodes[0];
        expect(row).toHaveClass('hover:bg-gray-100');
        expect(row).toHaveClass('active:bg-gray-200');
    });

    test("has proper classes with colored prop", () => {
        const user = mockUsers[0];
        const { container } = render(
            <table>
                <tbody>
                    <UsersTableEntry user={user} colored={true} />
                </tbody>
            </table>
        );

        const row = container.firstChild?.childNodes[0].childNodes[0];
        expect(row).toHaveClass('bg-gray-100');
        expect(row).toHaveClass('hover:bg-gray-200');
        expect(row).toHaveClass('active:bg-gray-300');
    });
});