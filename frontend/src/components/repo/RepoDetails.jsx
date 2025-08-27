import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import Navbar from "../Navbar";

function RepoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [desc, setDesc] = useState("");
  const [newContent, setNewContent] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const issueTitleRef = useMemo(() => ({ current: null }), []);
  const issueDescRef = useMemo(() => ({ current: null }), []);

  async function fetchRepo() {
    setLoading(true);
    try {
      const r = await api.get(`/repo/${id}`);
      setRepo(r.data);
      setDesc(r.data.description || "");
      setIssues(r.data.issues || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load repo");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleUpdate() {
    try {
      await api.put(`/repo/update/${id}`, { description: desc, content: newContent || undefined });
      setNewContent("");
      fetchRepo();
    } catch (e) {
      console.error(e);
      alert("Update failed");
    }
  }

  async function handleToggleVisibility() {
    try {
      await api.patch(`/repo/update/${id}`);
      fetchRepo();
    } catch (e) {
      console.error(e);
      alert("Toggle failed");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this repository?")) return;
    try {
      await api.delete(`/repo/delete/${id}`);
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  }

  async function handleCreateIssue(e) {
    e.preventDefault();
    const title = issueTitleRef.current?.value;
    const description = issueDescRef.current?.value;
    if (!title || !description) return;
    try {
      await api.post(`/issue/create`, { title, description, repository: id });
      issueTitleRef.current.value = "";
      issueDescRef.current.value = "";
      fetchRepo();
    } catch (e) {
      console.error(e);
      alert("Create issue failed");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!repo) return <div>Not found</div>;

  return (
    <>
      <Navbar />
      <section style={{ maxWidth: 800, margin: "24px auto" }}>
        <h2>{repo.name}</h2>
        <p>Visibility: {repo.visibility}</p>
        <button onClick={handleToggleVisibility}>Toggle Visibility</button>
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>
        <div style={{ marginTop: 16 }}>
          <label>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div style={{ marginTop: 8 }}>
            <label>Add Content Line</label>
            <input value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          </div>
          <button onClick={handleUpdate} style={{ marginTop: 8 }}>Save</button>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3>Content</h3>
          <ul>
            {(repo.content || []).map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3>Issues</h3>
          <form onSubmit={handleCreateIssue} style={{ marginBottom: 12 }}>
            <input placeholder="Title" ref={(el) => (issueTitleRef.current = el)} />
            <input placeholder="Description" ref={(el) => (issueDescRef.current = el)} />
            <button type="submit">Create</button>
          </form>
          <ul>
            {issues.map((i) => (
              <li key={i._id}>{i.title} - {i.status}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default RepoDetails;


