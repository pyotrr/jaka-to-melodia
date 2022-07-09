import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "../../layout/PageContainer";
import { ListContainer } from "../../../styles/Containers.styled";
import HistoryRepository from "../../../idb/respositories/history";
import { HistoryEntry as EntryType } from "../../../idb";
import Loading from "../../layout/Loading";
import { StyledContainer } from "../../../styles/Containers.styled";
import HistoryEntry from "./HistoryEntry";
import HistoryEntryDialog from "./HistoryEntryDialog";

const History: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [historyEntries, setHistoryEntries] = useState<EntryType[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null);

  useEffect(() => {
    HistoryRepository.getHistoryEntries()
      .then((entries) => {
        if (entries) {
          setHistoryEntries(entries);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onEntryClick = useCallback((entry: EntryType) => {
    setSelectedEntry(entry);
  }, []);

  return (
    <PageContainer title="History">
      {Boolean(selectedEntry) && (
        <HistoryEntryDialog
          entry={selectedEntry!}
          closeDialog={() => {
            setSelectedEntry(null);
          }}
        />
      )}
      <StyledContainer>
        {loading ? (
          <Loading />
        ) : (
          <ListContainer>
            {historyEntries.map((entry) => (
              <HistoryEntry
                key={entry.date}
                entry={entry}
                onClick={onEntryClick}
              />
            ))}
          </ListContainer>
        )}
      </StyledContainer>
    </PageContainer>
  );
};

export default History;
