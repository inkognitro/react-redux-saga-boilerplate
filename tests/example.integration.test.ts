function sum(one: number, two: number) {
    return (one + two);
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});