import React from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS, ASSIGNMENTS, assignmentsForChapter } from '../data/curriculum.js';
import courseFiles from '../course-files.json';

const KEY_CATEGORIES = [
  '00 GENERAL COURSE INFORMATION',
  '03 SYLLABUS & MASTERING BIOLOGY INFORMATION',
  '05 EXAM INFORMATION AND HOW TO SCHEDULE YOUR EXAMS',
  '07 IMPORTANT ANNOUNCEMENTS',
];

export default function CourseInfo() {
  const files = courseFiles.files || [];
  const keyFiles = files.filter((f) => KEY_CATEGORIES.includes(f.category));

  return (
    <section>
      <div className="eyebrow">— COURSE INFO</div>
      <h1 className="pagetitle">BIOL 1202 · General Biology II</h1>
      <p className="intro">
        {courseFiles.course} · {courseFiles.term}. This workspace turns your course material into checked practice, a Socratic live tutor, and a chapter-by-chapter teaching guide — all sharing one student profile.
      </p>

      <div className="stats">
        <div><label>CHAPTERS</label><strong>{CHAPTERS.length}</strong><small>CH 22–28: evolution, phylogeny, prokaryotes, protists</small></div>
        <div><label>PRACTICE SETS</label><strong>{ASSIGNMENTS.length}</strong><small>Concept drills, problem sets, and an Exam 1 review</small></div>
        <div><label>COURSE FILES</label><strong>{files.length}</strong><small>Linked from your class repository</small></div>
      </div>

      <div className="section">
        <div className="sectionhead">
          <div><label>HOW IT WORKS</label><h2>Four ways to learn, one profile</h2></div>
        </div>
        <div className="modegrid">
          <Link to="/tutor">
            <span aria-hidden="true">✦</span>
            <b>Checked practice</b>
            <small>Answer in your own words → see exactly which concepts you covered and which are thin → master a section and it returns as a spaced review.</small>
            <em>Open assignments →</em>
          </Link>
          <Link to="/live">
            <span aria-hidden="true">◍</span>
            <b>Live Tutor</b>
            <small>A Socratic tutor that reads your current question, leads with a guiding question, explains your mistakes, and cites course material.</small>
            <em>Open Live Tutor →</em>
          </Link>
          <Link to="/teach">
            <span aria-hidden="true">◈</span>
            <b>Teach me this chapter</b>
            <small>Every concept broken down in plain language — what it means, a definition, an analogy, an example, and the vocabulary. Then teach it back in your own words.</small>
            <em>Open a chapter lesson →</em>
          </Link>
          <Link to="/resources">
            <span aria-hidden="true">▤</span>
            <b>Resources</b>
            <small>Every file from the course repository, grouped by the folders your instructor uses.</small>
            <em>Browse materials →</em>
          </Link>
        </div>
      </div>

      <div className="section">
        <div className="sectionhead">
          <div><label>CHAPTER MAP</label><h2>What each chapter covers</h2></div>
        </div>
        <div className="chaptermap">
          {CHAPTERS.map((c) => {
            const sets = assignmentsForChapter(c.id);
            return (
              <div className="chaptermaprow" key={c.id}>
                <div className="chaptermapnum">CH {c.num}</div>
                <div className="chaptermapbody">
                  <b>{c.title}</b>
                  <small>{c.subtitle}</small>
                  <div className="chips">
                    {c.concepts.map((k) => <span className="chip" key={k.id}>{k.label}</span>)}
                  </div>
                  <div className="chaptermaplinks">
                    {sets.map((a) => <Link className="rowbtn" key={a.id} to={`/tutor/${a.id}`}>{a.title} →</Link>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section">
        <div className="sectionhead">
          <div><label>KEY DOCUMENTS</label><h2>Syllabus, exams & announcements</h2></div>
          <Link className="linkbtn" to="/resources">All materials →</Link>
        </div>
        <div className="resources">
          {keyFiles.slice(0, 12).map((f) => (
            <a className="resource" key={f.path} href={f.url} target="_blank" rel="noreferrer">
              <span className="fileicon">{(f.ext || 'file').toUpperCase().slice(0, 4)}</span>
              <span className="filecopy"><b>{f.title}</b><small>{f.category}</small></span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="sectionhead"><div><label>SOURCE</label><h2>Repository</h2></div></div>
        <p className="intro">
          Course content comes from <a href={courseFiles.repository} target="_blank" rel="noreferrer">{courseFiles.repository} ↗</a>. The chapter lessons are written to match the concepts in each chapter of this course.
        </p>
      </div>
    </section>
  );
}
