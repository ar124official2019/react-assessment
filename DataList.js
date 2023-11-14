
export function DataList({ data, space = 0}) {

  return (
    <>
      <div
        style={{
          padding: "4px",
          backgroundColor: "lightcyan",
          marginBottom: "1px",
        }}
      >
        <b>{data?.name}</b>

        <div style={{ padding: "4px", paddingLeft: `${space}px` }}>
          {data.children?.map((i) => (
            <DataList key={i.id} data={i} space={space + 20}></DataList>
          ))}
        </div>
      </div>
    </>
  );
}