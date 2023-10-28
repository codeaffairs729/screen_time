const Header = ({ columns }: { columns: string[] }) => {
  return (
      <thead>
          <tr>
              {columns.map((column) => {
                  return (
                      <th key={column} className="pb-1">
                          <span className="block bg-dtech-new-main-light text-center text-white shadow shadow-gray-400 font-medium py-2">
                              {column}
                              <div></div>
                          </span>
                      </th>
                  );
              })}
          </tr>
      </thead>
  );
};

export default Header;